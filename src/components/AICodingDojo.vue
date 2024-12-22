<template>
  <div class="ai-coding-dojo p-4">
    <h2 class="text-2xl font-bold mb-4">AI Coding Dojo</h2>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div class="challenge-section">
        <h3 class="text-xl mb-2">Challenge: {{ currentChallenge.title }}</h3>
        <p class="mb-4">{{ currentChallenge.description }}</p>
        <div class="mb-4">
          <label
            for="code-input"
            class="block text-sm font-medium text-gray-700"
            >Your Code:</label
          >
          <textarea
            id="code-input"
            v-model="userCode"
            class="w-full h-64 p-2 border rounded mt-1"
            placeholder="Write your code here..."
          ></textarea>
        </div>
        <button
          @click="submitCode"
          class="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Submit Code
        </button>
      </div>
      <div class="output-section">
        <h3 class="text-xl mb-2">Output</h3>
        <pre class="bg-gray-100 p-2 rounded h-64 overflow-auto">{{
          output
        }}</pre>
        <div class="mt-4">
          <h4 class="text-lg font-semibold">Test Cases:</h4>
          <ul class="list-disc list-inside">
            <li
              v-for="(testCase, index) in currentChallenge.testCases"
              :key="index"
            >
              Input: {{ testCase.input }}, Expected Output:
              {{ testCase.expectedOutput }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AICodingDojo",
  data() {
    return {
      challenges: [
        {
          title: "Sum of Array",
          description:
            "Write a function that returns the sum of all numbers in an array.",
          testCases: [
            { input: "[1, 2, 3, 4, 5]", expectedOutput: 15 },
            { input: "[-1, 0, 1]", expectedOutput: 0 },
          ],
        },
        {
          title: "Reverse String",
          description: "Write a function that reverses a given string.",
          testCases: [
            { input: '"hello"', expectedOutput: '"olleh"' },
            { input: '"OpenAI"', expectedOutput: '"IAnepo"' },
          ],
        },
      ],
      currentChallengeIndex: 0,
      userCode: "",
      output: "",
    };
  },
  computed: {
    currentChallenge() {
      return this.challenges[this.currentChallengeIndex];
    },
  },
  methods: {
    submitCode() {
      try {
        const testFunction = new Function(
          "input",
          this.userCode +
            "\nreturn " +
            this.currentChallenge.title.replace(/\s+/g, "") +
            "(input);"
        );
        const results = this.currentChallenge.testCases.map((testCase) => {
          const input = JSON.parse(testCase.input);
          const result = testFunction(input);
          return `Input: ${testCase.input}, Output: ${JSON.stringify(
            result
          )}, Expected: ${testCase.expectedOutput}, Passed: ${
            result === testCase.expectedOutput
          }`;
        });
        this.output = results.join("\n");
        if (results.every((r) => r.includes("Passed: true"))) {
          this.nextChallenge();
        }
      } catch (error) {
        this.output = `Error: ${error.message}`;
      }
    },
    nextChallenge() {
      this.currentChallengeIndex =
        (this.currentChallengeIndex + 1) % this.challenges.length;
      this.userCode = "";
      this.output = "";
    },
  },
};
</script>
