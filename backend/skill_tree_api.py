from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict
import networkx as nx
import matplotlib.pyplot as plt
import io
import base64

app = FastAPI()


class Quiz(BaseModel):
    question: str
    options: List[str]
    correct_answer: int
    explanation: str


class Skill(BaseModel):
    id: int
    name: str
    description: str
    prerequisites: List[int]
    difficulty: int
    xp_required: int
    status: str = "not_started"
    study_content: Dict[str, str]
    quizzes: List[Quiz]
    exercises: List[str]
    resources: List[Dict[str, str]]


class SkillTree:
    def __init__(self):
        self.skills = {
            1: Skill(
                id=1,
                name="AI Fundamentals",
                description="Learn the basic concepts of AI and what makes a system 'intelligent'",
                prerequisites=[],
                difficulty=1,
                xp_required=0,
                study_content={
                    "theory": """
# Introduction to Artificial Intelligence

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
   - Virtual assistants
""",
                    "examples": """
# Real-World AI Examples

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
  ```python
  # Simplified recommendation logic
  def recommend_movies(user_preferences, movie_database):
      matches = []
      for movie in movie_database:
          if matches_preferences(movie, user_preferences):
              matches.append(movie)
      return sort_by_relevance(matches)
  ```

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
  - Treatment recommendations
""",
                    "practice": """
# Practical Exercises

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
3. Space exploration
"""
                },
                quizzes=[
                    Quiz(
                        question="What is the main difference between narrow AI and general AI?",
                        options=[
                            "Narrow AI is slower than general AI",
                            "Narrow AI is specific to certain tasks while general AI can handle any intellectual task",
                            "General AI is currently widely used while narrow AI is theoretical",
                            "Narrow AI requires more computing power than general AI"
                        ],
                        correct_answer=1,
                        explanation="Narrow AI is designed for specific tasks and excels in its designated domain, while general AI (still theoretical) would be capable of handling any intellectual task that a human can."
                    ),
                    Quiz(
                        question="Which of these is NOT a core component of artificial intelligence?",
                        options=[
                            "Machine Learning",
                            "Database Management",
                            "Natural Language Processing",
                            "Computer Vision"
                        ],
                        correct_answer=1,
                        explanation="While databases are important tools in AI systems, they are not a core component of AI itself. The other options are key areas of AI technology."
                    )
                ],
                exercises=[
                    "Create a flowchart showing how an AI system might process and respond to a voice command",
                    "Write a brief proposal for an AI application in your field of interest",
                    "Compare and contrast human intelligence with artificial intelligence using a Venn diagram"
                ],
                resources=[
                    {
                        "title": "AI: A Modern Approach",
                        "url": "https://aima.cs.berkeley.edu/",
                        "type": "book"
                    },
                    {
                        "title": "Elements of AI",
                        "url": "https://www.elementsofai.com/",
                        "type": "course"
                    }
                ]
            ),
            2: Skill(
                id=2,
                name="Python Basics",
                description="Master fundamental Python programming concepts",
                prerequisites=[1],
                difficulty=1,
                xp_required=100,
                study_content={
                    "theory": "# Python Basics Content...",
                    "examples": "# Python Examples...",
                    "practice": "# Python Exercises..."
                },
                quizzes=[
                    Quiz(
                        question="What is Python?",
                        options=[
                            "A snake",
                            "A high-level programming language",
                            "A low-level programming language",
                            "A database"
                        ],
                        correct_answer=1,
                        explanation="Python is a high-level, interpreted programming language."
                    )
                ],
                exercises=[],
                resources=[]
            ),
            3: Skill(
                id=3,
                name="Mathematics for AI",
                description="Essential mathematical concepts for AI",
                prerequisites=[1],
                difficulty=2,
                xp_required=100,
                study_content={
                    "theory": "# Mathematics Content...",
                    "examples": "# Math Examples...",
                    "practice": "# Math Exercises..."
                },
                quizzes=[],
                exercises=[],
                resources=[]
            ),
            4: Skill(
                id=4,
                name="Machine Learning Basics",
                description="Introduction to machine learning concepts",
                prerequisites=[2, 3],
                difficulty=2,
                xp_required=200,
                study_content={
                    "theory": "# Machine Learning Content...",
                    "examples": "# ML Examples...",
                    "practice": "# ML Exercises..."
                },
                quizzes=[],
                exercises=[],
                resources=[]
            ),
            5: Skill(
                id=5,
                name="Neural Networks",
                description="Understanding neural networks and deep learning",
                prerequisites=[4],
                difficulty=3,
                xp_required=300,
                study_content={
                    "theory": "# Neural Networks Content...",
                    "examples": "# NN Examples...",
                    "practice": "# NN Exercises..."
                },
                quizzes=[],
                exercises=[],
                resources=[]
            ),
            6: Skill(
                id=6,
                name="Computer Vision",
                description="Image processing and vision applications",
                prerequisites=[5],
                difficulty=4,
                xp_required=400,
                study_content={
                    "theory": "# Computer Vision Content...",
                    "examples": "# CV Examples...",
                    "practice": "# CV Exercises..."
                },
                quizzes=[],
                exercises=[],
                resources=[]
            ),
            7: Skill(
                id=7,
                name="Natural Language Processing",
                description="Text processing and language understanding",
                prerequisites=[5],
                difficulty=4,
                xp_required=400,
                study_content={
                    "theory": "# NLP Content...",
                    "examples": "# NLP Examples...",
                    "practice": "# NLP Exercises..."
                },
                quizzes=[],
                exercises=[],
                resources=[]
            )
        }

    def get_skill_graph(self):
        G = nx.DiGraph()
        colors = []
        labels = {}

        for skill_id, skill in self.skills.items():
            G.add_node(skill_id)
            labels[skill_id] = f"{skill.name}\n(Level {skill.difficulty})"

            # Add color based on status
            if skill.status == "completed":
                colors.append('#10B981')  # green-500
            elif skill.status == "in_progress":
                colors.append('#FBBF24')  # yellow-400
            else:
                colors.append('#60A5FA')  # blue-400

            for prereq in skill.prerequisites:
                G.add_edge(prereq, skill_id)

        return G, colors, labels

    def generate_graph_image(self):
        G, colors, labels = self.get_skill_graph()

        # Clear any existing plots
        plt.clf()

        # Create figure with transparent background
        fig = plt.figure(figsize=(12, 8), facecolor='none')

        # Set layout for the graph
        pos = nx.spring_layout(G, k=1, iterations=50)

        # Draw the edges (connections between skills)
        nx.draw_networkx_edges(G, pos,
                               edge_color='#4B5563',  # gray-600
                               arrows=True,
                               arrowsize=20,
                               width=2,
                               alpha=0.6)

        # Draw the nodes (skills)
        nx.draw_networkx_nodes(G, pos,
                               node_color=colors,
                               node_size=3000,
                               alpha=0.9)

        # Add labels to the nodes
        nx.draw_networkx_labels(G, pos, labels,
                                font_size=8,
                                font_weight='bold',
                                font_color='black')

        # Remove axes
        plt.axis('off')

        # Add some padding around the graph
        plt.margins(0.1)

        # Save to bytes buffer
        buf = io.BytesIO()
        plt.savefig(buf,
                    format='png',
                    dpi=200,
                    bbox_inches='tight',
                    transparent=True)
        plt.close()
        buf.seek(0)
        return base64.b64encode(buf.getvalue()).decode()


skill_tree = SkillTree()


@app.get("/skills")
async def get_skills():
    return list(skill_tree.skills.values())


@app.get("/skill-tree-image")
async def get_skill_tree_image():
    return {"image": skill_tree.generate_graph_image()}


# Add this new model for status updates
class StatusUpdate(BaseModel):
    status: str


@app.put("/skills/{skill_id}/status")
async def update_skill_status(skill_id: int, status_update: StatusUpdate):
    if skill_id not in skill_tree.skills:
        raise HTTPException(status_code=404, detail="Skill not found")
    if status_update.status not in ["not_started", "in_progress", "completed"]:
        raise HTTPException(status_code=422, detail="Invalid status")
    skill_tree.skills[skill_id].status = status_update.status
    return skill_tree.skills[skill_id]
