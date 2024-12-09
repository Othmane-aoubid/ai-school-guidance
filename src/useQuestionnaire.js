import { ref } from 'vue';

export function useQuestionnaire() {
  const answers = ref({});

  const sections = [
    {
      title: 'Academic Guidance',
      questions: [
        {
          id: 'academic_1',
          text: 'Which subjects do you enjoy studying the most?',
          type: 'text'
        },
        {
          id: 'academic_2',
          text: 'Are there any subjects where you feel you need extra help?',
          type: 'text'
        },
        {
          id: 'academic_3',
          text: 'How many hours per week do you dedicate to studying?',
          type: 'number'
        },
        {
          id: 'academic_4',
          text: 'Do you prefer studying alone or in a group?',
          type: 'radio',
          options: [
            { value: 'alone', label: 'Alone' },
            { value: 'group', label: 'Group' },
            { value: 'both', label: 'Both' }
          ]
        }
        // Add more academic guidance questions here
      ]
    },
    {
      title: 'Career Guidance',
      questions: [
        {
          id: 'career_1',
          text: 'What is your dream job, and why?',
          type: 'textarea'
        },
        {
          id: 'career_2',
          text: 'What activities or hobbies do you enjoy that could become a career?',
          type: 'textarea'
        },
        {
          id: 'career_3',
          text: 'What skills do you think you are good at?',
          type: 'text'
        }
        // Add more career guidance questions here
      ]
    },
    {
      title: 'Emotional and Personal Support',
      questions: [
        {
          id: 'emotional_1',
          text: 'How do you handle stress from schoolwork?',
          type: 'textarea'
        },
        {
          id: 'emotional_2',
          text: 'Would you like tips on managing your time better?',
          type: 'checkbox'
        },
        {
          id: 'emotional_3',
          text: 'Do you feel overwhelmed often?',
          type: 'scale'
        }
        // Add more emotional support questions here
      ]
    }
  ];

  return {
    sections,
    answers
  };
}
