import { defineStore } from 'pinia'

export const useQuizStore = defineStore('quiz', {
  state: () => ({
    categories: [
      {
        name: 'Communication & Interpersonal Skills',
        questions: [
          {
            text: 'How comfortable are you with public speaking?',
            options: ['Not at all', 'Somewhat', 'Moderately', 'Very', 'Extremely']
          },
          {
            text: 'How well do you work in a team?',
            options: ['Not at all', 'Somewhat', 'Moderately', 'Very', 'Extremely']
          }
        ]
      },
      {
        name: 'Cognitive Skills',
        questions: [
          {
            text: 'How would you rate your problem-solving abilities?',
            options: ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent']
          },
          {
            text: 'How quickly do you adapt to new situations?',
            options: ['Very Slowly', 'Slowly', 'Moderately', 'Quickly', 'Very Quickly']
          }
        ]
      },
      {
        name: 'Technical Skills',
        questions: [
          {
            text: 'How proficient are you with programming languages?',
            options: ['Not at all', 'Beginner', 'Intermediate', 'Advanced', 'Expert']
          },
          {
            text: 'How comfortable are you with data analysis?',
            options: ['Not at all', 'Somewhat', 'Moderately', 'Very', 'Extremely']
          }
        ]
      },
      {
        name: 'Work Ethic & Personal Qualities',
        questions: [
          {
            text: 'How would you describe your attention to detail?',
            options: ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent']
          },
          {
            text: 'How well do you manage your time?',
            options: ['Poorly', 'Fairly', 'Well', 'Very Well', 'Excellently']
          }
        ]
      },
      {
        name: 'Interests & Aspirations',
        questions: [
          {
            text: 'How interested are you in leadership roles?',
            options: ['Not at all', 'Slightly', 'Moderately', 'Very', 'Extremely']
          },
          {
            text: 'How important is continuous learning to you?',
            options: ['Not at all', 'Slightly', 'Moderately', 'Very', 'Extremely']
          }
        ]
      }
    ],
    responses: {},
    showResults: false,
    strengths: [],
    areasForImprovement: [],
    personalizedFeedback: '',
    suggestions: []
  }),
  actions: {
    validateResponses() {
      const totalQuestions = this.categories.reduce((sum, category) => sum + category.questions.length, 0)
      return Object.keys(this.responses).length === totalQuestions
    },
    processResults() {
      // This is a simplified example. In a real application, you'd have more complex logic here.
      this.strengths = ['Strong communication skills', 'Excellent problem-solving abilities']
      this.areasForImprovement = ['Time management could be improved', 'Technical skills need development']
      this.personalizedFeedback = 'You demonstrate strong interpersonal skills and adaptability. Focus on enhancing your technical abilities to round out your skill set.'
      this.suggestions = [
        'Take an online course in programming to improve technical skills',
        'Practice time management techniques to boost productivity',
        'Join a public speaking club to further enhance communication skills'
      ]
    }
  }
})