export interface AIResponseInterface {
  choices: [
    {
      message: {
        role: 'assistant';
        content: string;
      };
    },
  ];
}
