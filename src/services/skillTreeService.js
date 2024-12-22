import { db } from "../firebase/config";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

const initialSkills = {
  1: {
    id: 1,
    name: "AI Fundamentals",
    description:
      "Learn the basic concepts of AI and what makes a system 'intelligent'",
    prerequisites: [],
    difficulty: 1,
    xp_required: 0,
    status: "not_started",
    study_content: {
      theory: `# Introduction to Artificial Intelligence

## What is Artificial Intelligence?
Artificial Intelligence (AI) refers to systems or machines that mimic human intelligence 
to perform tasks and can iteratively improve themselves based on the information they collect.

## Core Concepts of AI

### 1. Intelligence
- Ability to acquire and apply knowledge
- Problem-solving capabilities
- Pattern recognition
- Adaptation to new situations

### 2. Machine Learning
- Subset of AI that focuses on learning from data
- Improves performance through experience
- Types: Supervised, Unsupervised, Reinforcement Learning

### 3. Neural Networks
- Inspired by human brain structure
- Connected nodes (neurons) processing information
- Foundation of deep learning

### 4. Expert Systems
- Rule-based decision making
- Domain-specific knowledge
- Logical inference engines

## Applications of AI
1. Healthcare
   - Disease diagnosis
   - Drug discovery
   - Patient care optimization

2. Finance
   - Fraud detection
   - Trading algorithms
   - Risk assessment

3. Transportation
   - Autonomous vehicles
   - Traffic optimization
   - Route planning

4. Entertainment
   - Game AI
   - Content recommendations
   - Virtual assistants`,
      examples: `# Real-World AI Examples

## 1. Virtual Assistants
- Siri (Apple)
  - Natural language processing
  - Voice recognition
  - Task automation
- Alexa (Amazon)
  - Smart home control
  - Voice commerce
  - Information retrieval

## 2. Recommendation Systems
- Netflix
  \`\`\`python
  # Simplified recommendation logic
  def recommend_movies(user_preferences, movie_database):
      matches = []
      for movie in movie_database:
          if matches_preferences(movie, user_preferences):
              matches.append(movie)
      return sort_by_relevance(matches)
  \`\`\`

## 3. Computer Vision
- Face Recognition
  - Security systems
  - Phone unlocking
  - Photo organization

## 4. Game AI
- Chess Engines
  - Strategic planning
  - Move evaluation
  - Pattern recognition

## 5. Healthcare AI
- Diagnostic Systems
  - Image analysis
  - Patient data processing
  - Treatment recommendations`,
      practice: `# Practical Exercises

## Exercise 1: AI Classification
Classify the following systems as AI or Non-AI and explain why:
1. Calculator
2. Spam Filter
3. Thermostat
4. Chess Computer
5. Voice Assistant

## Exercise 2: AI Application Design
Design a simple AI system for one of these scenarios:
1. Restaurant recommendation system
2. Weather prediction system
3. Music playlist generator

Include:
- Input data needed
- Processing steps
- Expected output
- Learning mechanism

## Exercise 3: Ethical Considerations
Analyze these AI scenarios for ethical implications:
1. AI-based hiring system
2. Autonomous vehicle decisions
3. Predictive policing system

## Exercise 4: Future Applications
Brainstorm potential AI applications for:
1. Education
2. Environmental protection
3. Space exploration`,
    },
    quizzes: [
      {
        question:
          "What is the main difference between narrow AI and general AI?",
        options: [
          "Narrow AI is slower than general AI",
          "Narrow AI is specific to certain tasks while general AI can handle any intellectual task",
          "General AI is currently widely used while narrow AI is theoretical",
          "Narrow AI requires more computing power than general AI",
        ],
        correct_answer: 1,
        explanation:
          "Narrow AI is designed for specific tasks and excels in its designated domain, while general AI (still theoretical) would be capable of handling any intellectual task that a human can.",
      },
      {
        question:
          "Which of these is NOT a core component of artificial intelligence?",
        options: [
          "Machine Learning",
          "Database Management",
          "Natural Language Processing",
          "Computer Vision",
        ],
        correct_answer: 1,
        explanation:
          "While databases are important tools in AI systems, they are not a core component of AI itself. The other options are key areas of AI technology.",
      },
    ],
    exercises: [
      "Create a flowchart showing how an AI system might process and respond to a voice command",
      "Write a brief proposal for an AI application in your field of interest",
      "Compare and contrast human intelligence with artificial intelligence using a Venn diagram",
    ],
    resources: [
      {
        title: "AI: A Modern Approach",
        url: "https://aima.cs.berkeley.edu/",
        type: "book",
      },
      {
        title: "Elements of AI",
        url: "https://www.elementsofai.com/",
        type: "course",
      },
    ],
  },
  2: {
    id: 2,
    name: "Python Basics",
    description: "Master fundamental Python programming concepts",
    prerequisites: [1],
    difficulty: 1,
    xp_required: 100,
    status: "not_started",
    study_content: {
      theory: "# Python Basics Content...",
      examples: "# Python Examples...",
      practice: "# Python Exercises...",
    },
    quizzes: [
      {
        question: "What is Python?",
        options: [
          "A snake",
          "A high-level programming language",
          "A low-level programming language",
          "A database",
        ],
        correct_answer: 1,
        explanation:
          "Python is a high-level, interpreted programming language.",
      },
    ],
    exercises: [],
    resources: [],
  },
  3: {
    id: 3,
    name: "Mathematics for AI",
    description: "Essential mathematical concepts for AI",
    prerequisites: [1],
    difficulty: 2,
    xp_required: 100,
    status: "not_started",
    study_content: {
      theory: "# Mathematics Content...",
      examples: "# Math Examples...",
      practice: "# Math Exercises...",
    },
    quizzes: [],
    exercises: [],
    resources: [],
  },
  4: {
    id: 4,
    name: "Machine Learning Basics",
    description: "Introduction to machine learning concepts",
    prerequisites: [2, 3],
    difficulty: 2,
    xp_required: 200,
    status: "not_started",
    study_content: {
      theory: "# Machine Learning Content...",
      examples: "# ML Examples...",
      practice: "# ML Exercises...",
    },
    quizzes: [],
    exercises: [],
    resources: [],
  },
  5: {
    id: 5,
    name: "Neural Networks",
    description: "Understanding neural networks and deep learning",
    prerequisites: [4],
    difficulty: 3,
    xp_required: 300,
    status: "not_started",
    study_content: {
      theory: "# Neural Networks Content...",
      examples: "# NN Examples...",
      practice: "# NN Exercises...",
    },
    quizzes: [],
    exercises: [],
    resources: [],
  },
  6: {
    id: 6,
    name: "Computer Vision",
    description: "Image processing and vision applications",
    prerequisites: [5],
    difficulty: 4,
    xp_required: 400,
    status: "not_started",
    study_content: {
      theory: "# Computer Vision Content...",
      examples: "# CV Examples...",
      practice: "# CV Exercises...",
    },
    quizzes: [],
    exercises: [],
    resources: [],
  },
  7: {
    id: 7,
    name: "Natural Language Processing",
    description: "Text processing and language understanding",
    prerequisites: [5],
    difficulty: 4,
    xp_required: 400,
    status: "not_started",
    study_content: {
      theory: "# NLP Content...",
      examples: "# NLP Examples...",
      practice: "# NLP Exercises...",
    },
    quizzes: [],
    exercises: [],
    resources: [],
  },
};

class SkillTreeService {
  async initializeSkillsIfNeeded() {
    try {
      const skillsRef = collection(db, "skills");
      const snapshot = await getDocs(skillsRef);

      if (snapshot.empty) {
        const promises = Object.values(initialSkills).map((skill) =>
          setDoc(doc(skillsRef, skill.id.toString()), skill)
        );
        await Promise.all(promises);
      }
    } catch (error) {
      console.error("Error initializing skills:", error);
      throw error;
    }
  }

  async getAllSkills() {
    try {
      const skillsRef = collection(db, "skills");
      const snapshot = await getDocs(skillsRef);
      return snapshot.docs.map((doc) => doc.data());
    } catch (error) {
      console.error("Error getting skills:", error);
      throw error;
    }
  }

  async updateSkillStatus(skillId, newStatus) {
    try {
      if (!["not_started", "in_progress", "completed"].includes(newStatus)) {
        throw new Error("Invalid status");
      }

      const skillRef = doc(db, "skills", skillId.toString());
      await updateDoc(skillRef, { status: newStatus });
    } catch (error) {
      console.error("Error updating skill status:", error);
      throw error;
    }
  }

  getSkillGraphData(skills) {
    const nodes = skills.map((skill) => ({
      id: skill.id,
      label: `${skill.name}\n(Level ${skill.difficulty})`,
      color: this.getNodeColor(skill.status),
    }));

    const edges = skills.flatMap((skill) =>
      skill.prerequisites.map((prereqId) => ({
        from: prereqId,
        to: skill.id,
      }))
    );

    return { nodes, edges };
  }

  getNodeColor(status) {
    switch (status) {
      case "completed":
        return "#10B981";
      case "in_progress":
        return "#FBBF24";
      default:
        return "#60A5FA";
    }
  }
}

export const skillTreeService = new SkillTreeService();
