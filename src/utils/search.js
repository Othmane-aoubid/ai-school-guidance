// Constants for search weights
const WEIGHTS = {
  EXACT_MATCH: 1.0,
  TITLE_MATCH: 0.8,
  CONTENT_MATCH: 0.6,
  PARTIAL_MATCH: 0.4,
  TAG_MATCH: 0.3
};

// Normalize text for searching
function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .trim();
}

// Calculate relevance score
function calculateScore(query, item) {
  const normalizedQuery = normalizeText(query);
  const words = normalizedQuery.split(/\s+/);
  let score = 0;

  // Helper function to check matches
  const checkMatch = (text, weight) => {
    if (!text) return 0;
    const normalizedText = normalizeText(text);
    
    // Exact match
    if (normalizedText === normalizedQuery) {
      return weight * WEIGHTS.EXACT_MATCH;
    }
    
    // Word matches
    let wordScore = 0;
    words.forEach(word => {
      if (normalizedText.includes(word)) {
        wordScore += (weight * WEIGHTS.PARTIAL_MATCH) / words.length;
      }
    });
    
    return wordScore;
  };

  // Check different fields with different weights
  score += checkMatch(item.title, WEIGHTS.TITLE_MATCH);
  score += checkMatch(item.content, WEIGHTS.CONTENT_MATCH);
  score += checkMatch(item.description, WEIGHTS.CONTENT_MATCH);
  
  // Check tags if they exist
  if (item.tags && Array.isArray(item.tags)) {
    score += item.tags.reduce((acc, tag) => 
      acc + checkMatch(tag, WEIGHTS.TAG_MATCH), 0);
  }

  return score;
}

// Index builder for better search performance
class SearchIndex {
  constructor() {
    this.index = {
      pages: new Map(),
      content: new Map(),
      users: new Map()
    };
    this.initialized = false;
  }

  async initialize(router, store) {
    if (this.initialized) return;

    try {
      // Index all routes/pages
      router.getRoutes().forEach(route => {
        if (route.meta?.searchable !== false) {
          this.addToIndex('pages', {
            id: route.path,
            title: route.meta?.title || route.path,
            content: route.meta?.description || '',
            path: route.path,
            type: 'page'
          });
        }
      });

      // Index content from your store/API
      // This is an example - modify according to your data structure
      if (store?.state?.content) {
        Object.entries(store.state.content).forEach(([id, content]) => {
          this.addToIndex('content', {
            id,
            title: content.title,
            content: content.body,
            description: content.description,
            tags: content.tags,
            path: `/content/${id}`,
            type: 'content'
          });
        });
      }

      // Index users if needed
      if (store?.state?.users) {
        Object.entries(store.state.users).forEach(([id, user]) => {
          this.addToIndex('users', {
            id,
            title: user.name,
            content: user.bio,
            email: user.email,
            avatar: user.avatar,
            path: `/users/${id}`,
            type: 'user'
          });
        });
      }

      this.initialized = true;
    } catch (error) {
      console.error('Error initializing search index:', error);
    }
  }

  addToIndex(type, item) {
    this.index[type].set(item.id, item);
  }

  removeFromIndex(type, id) {
    this.index[type].delete(id);
  }

  updateIndex(type, item) {
    this.addToIndex(type, item);
  }
}

// Create singleton instance
const searchIndex = new SearchIndex();

// Main search function
export async function globalSearch(query, options = {}) {
  if (!query || query.length < 2) return null;

  const {
    limit = 10,
    threshold = 0.2,
    types = ['pages', 'content', 'users']
  } = options;

  const results = {
    pages: [],
    content: [],
    users: []
  };

  // Search through each type
  types.forEach(type => {
    const items = Array.from(searchIndex.index[type].values());
    const typeResults = items
      .map(item => ({
        item,
        score: calculateScore(query, item)
      }))
      .filter(({ score }) => score > threshold)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(({ item, score }) => ({
        ...item,
        relevance: score
      }));

    results[type] = typeResults;
  });

  return results;
}

// Page-specific search
export function pageSearch(query, pageContent) {
  if (!query || !pageContent) return [];

  const sections = pageContent.sections || [];
  const results = [];

  sections.forEach(section => {
    const score = calculateScore(query, {
      title: section.title,
      content: section.content
    });

    if (score > 0.2) {
      results.push({
        title: section.title,
        content: section.content,
        score,
        highlight: highlightText(section.content, query)
      });
    }
  });

  return results.sort((a, b) => b.score - a.score);
}

// Helper function to highlight matching text
function highlightText(text, query) {
  const normalizedText = text.toLowerCase();
  const normalizedQuery = query.toLowerCase();
  const index = normalizedText.indexOf(normalizedQuery);
  
  if (index === -1) return text.substring(0, 100) + '...';
  
  const start = Math.max(0, index - 40);
  const end = Math.min(text.length, index + query.length + 40);
  
  return (start > 0 ? '...' : '') +
         text.substring(start, end) +
         (end < text.length ? '...' : '');
}

// Export the index for initialization
export const initializeSearch = async (router, store) => {
  await searchIndex.initialize(router, store);
};

// Export methods for index management
export const searchIndexMethods = {
  add: (type, item) => searchIndex.addToIndex(type, item),
  remove: (type, id) => searchIndex.removeFromIndex(type, id),
  update: (type, item) => searchIndex.updateIndex(type, item)
}; 