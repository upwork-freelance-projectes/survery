import { createSlice } from "@reduxjs/toolkit";
import produce from "immer";
export const questionSlice = createSlice({
	name: "questions",
	initialState: {
		questions: [
			{},
			{
				question: `Which of the following statements best
describes how your household’s total
spending compared to total income
over the last 12 months?`,
				answers: [
					"Spending was much less than income",
					"Spending was a little less than income",
					"Spending was about equal to income",
					"Spending was a little more than income",
					"Spending was much more than income",
				],
			},
			{
				question: `Which of the following statements best
describes how your household has paid
its bills over the last 12 months?`,
				answers: [
					"Pay all of our bills on time",
					"Pay nearly all of our bills on time",
					"Pay most of our bills on time",
					"Pay some of our bills on time",
					"Pay very few of our bills on time",
				],
			},
			{
				question: `At your current level of spending,
how long could you and your household
afford to cover expenses, if you had
to live on only the money you have
readily available, without withdrawing
money from retirement accounts
or borrowing?`,
				answers: [
					"6 months or more",
					"3-5 months",
					"1-2 months",
					"1-3 weeks",
					"Less than 1 week",
				],
			},
			{
				question: `How confident are you that your household
is currently doing what is needed to meet
your longer-term goals?`,
				answers: [
					"Very confident",
					"Moderately confident",
					"Somewhat confident",
					"Slightly confident",
					"Not at all confident",
				],
			},
			{
				question: `As of today, which of the following
statements describes how manageable
your household debt is?`,
				answers: [
					"Do not have any debt",
					"Have a manageable amount of debt",
					"Have a bit more debt than is manageable",
					"Have far more debt than is manageable",
				],
			},
			{
				question: `How would you rate your credit score?
Your credit score is a number that
tells lenders how risky or safe you
are as a borrower.`,
				answers: [
					"Excellent",
					"Very good",
					"Good",
					"Fair",
					"Poor",
					"I don’t know",
				],
			},

			{
				question: `How confident are you that those
insurance policies will provide enough
support in case of an emergency?`,
				answers: [
					"Very confident",
					"Moderately confident",
					"Somewhat confident",
					"Slightly confident",
					"Not at all confident",
					"No one in my household has any insurance",
				],
			},
			{
				question: `To what extent do you agree or disagree
with the following statement:
“My household plans ahead financially.`,
				answers: [
					"Agree strongly",
					"Agree somewhat",
					"Neither agree nor disagree",
					"Disagree somewhat",
					"Disagree strongly",
				],
			},
		],
		answers: [
			{
				location: "8",
				answer: "Agree somewhat",
				i: -1,
			},
			{
				location: "7",
				answer: "Very confident",
				i: -1,
			},
			{
				location: "6",
				answer: "Very good",
				i: -1,
			},
			{
				location: "5",
				answer: "Have a bit more debt than is manageable",
				i: -1,
			},
			{
				location: "4",
				answer: "Moderately confident",
				i: -1,
			},
			{
				location: "3",
				answer: "3-5 months",
				i: -1,
			},
			{
				location: "2",
				answer: "Pay all of our bills on time",
				i: -1,
			},
			{
				location: "1",
				answer: "Spending was a little less than income",
				i: 1,
			},
		],
		scores: [],
	},

	reducers: {
		setAnswers: (state, action) => {
			// [].find((answer)=>answer.location == action.payload.location)
			console.log(action, "set new answers");

			return { ...state, answers: [action.payload, ...state.answers] };
		},
		updateAnswers: (state, action) => {
			return {
				...state,
				answers: produce(state.answers, draft => {
					const index = draft.findIndex(
						answer => answer.location == action.payload.location,
					);
					if (index !== -1) draft[index].answer = action.payload.answer;
				}),
			};
		},
		setScores: (state, action) => {
	

			return {
				...state,
				scores: produce(state.scores, draft => {
					const index = draft.findIndex(
						score => score.location == action.payload.location,
					);

				

					if (index !== -1) {
					
						if (draft[index].score !== action.payload.score)
							draft[index].score = action.payload.score;
					} else {
						draft.unshift(action.payload);
					}
				}),
			};

			// return { ...state, scores: [action.payload, ...state.scores] };
		},
	},
});

export const { setAnswers, updateAnswers, setScores } = questionSlice.actions;

export default questionSlice.reducer;
