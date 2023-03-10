export const score = (answers, dispatch,setScores) => {
	// console.log(answers, 'answers to score')
	answers.forEach(answer => {
		// console.log(answer.location,answer.location=="8", "location");
		let score;
		switch (answer.location) {
			case "1":

				switch (answer.answer) {
					case "Spending was much less than income":
						score = 100;
						dispatch(setScores({score,location:answer.location}));
						break;
					case "Spending was a little less than income":
						score = 75;
						dispatch(setScores({score,location:answer.location}));

						break;
					case "Spending was about equal to income":
						score = 50;
						dispatch(setScores({score,location:answer.location}));
						break;
					case "Spending was a little more than income":
						score = 25;
						dispatch(setScores({score,location:answer.location}));
						break;
					case "Spending was much more than income":
						score = 0;
						dispatch(setScores({score,location:answer.location}));
						break;
					default:
						break;
				}

				break;
			case "2":
				switch (answer.answer) {
					case "Pay all of our bills on time":
						score = 100;
						dispatch(setScores({score,location:answer.location}));
						break;
					case "Pay nearly all of our bills on time":
						score = 60;
						dispatch(setScores({score,location:answer.location}));

						break;
					case "Pay most of our bills on time":
						score = 40;
						dispatch(setScores({score,location:answer.location}));

						break;
					case "Pay some of our bills on time":
						score = 20;
						dispatch(setScores({score,location:answer.location}));

						break;
					case "Pay very few of our bills on time":
						score = 0;
						dispatch(setScores({score,location:answer.location}));
						break;
					default:
						break;
				}

				break;
			case "3":
				switch (answer.answer) {
					case "6 months or more":
						score = 100;
						dispatch(setScores({score,location:answer.location}));
						break;
					case "3-5 months":
						score = 75;
						dispatch(setScores({score,location:answer.location}));

						break;
					case "1-2 months":
						score = 50;
						dispatch(setScores({score,location:answer.location}));

						break;
					case "1-3 weeks":
						score = 25;
						dispatch(setScores({score,location:answer.location}));

						break;
					case "Less than 1 week":
						score = 0;
						dispatch(setScores({score,location:answer.location}));
						break;
					default:
						break;
				}

				break;
			case "4":
				switch (answer.answer) {
					case "Very confident":
						score = 100;
						dispatch(setScores({score,location:answer.location}));
						break;
					case "Moderately confident":
						score = 75;
						dispatch(setScores({score,location:answer.location}));

						break;
					case "Somewhat confident":
						score = 50;
						dispatch(setScores({score,location:answer.location}));

						break;
					case "Slightly confident":
						score = 25;
						dispatch(setScores({score,location:answer.location}));

						break;
					case "Not at all confident":
						score = 0;
						dispatch(setScores({score,location:answer.location}));
						break;
					default:
						break;
				}

				break;
			case "5":
				switch (answer.answer) {
					case "Do not have any debt":
						score = 100;
						dispatch(setScores({score,location:answer.location}));
						break;
					case "Have a manageable amount of debt":
						score = 85;
						dispatch(setScores({score,location:answer.location}));

						break;
					case "Have a bit more debt than is manageable":
						score = 40;
						dispatch(setScores({score,location:answer.location}));

						break;
					case "Have far more debt than is manageable":
						score = 0;
						dispatch(setScores({score,location:answer.location}));

						break;

					default:
						break;
				}

				break;
			case "6":
				switch (answer.answer) {
					case "Excellent":
						score = 100;
						dispatch(setScores({score,location:answer.location}));
						break;
					case "Very good":
						score = 80;
						dispatch(setScores({score,location:answer.location}));

						break;
					case "Good":
						score = 60;
						dispatch(setScores({score,location:answer.location}));

						break;
					case "Fair":
						score = 40;
						dispatch(setScores({score,location:answer.location}));

						break;
					case "Poor":
						score = 0;
						dispatch(setScores({score,location:answer.location}));
						break;
					case "I don't know":
						score = 0;
						dispatch(setScores({score,location:answer.location}));
						break;
					default:
						break;
				}

				break;
			case "7":
				switch (answer.answer) {
					case "Very confident":
						console.log(answer.answer);
						score = 100;
						dispatch(setScores({score,location:answer.location}));
						break;
					case "Moderately confident":
						score = 75;
						dispatch(setScores({score,location:answer.location}));

						break;
					case "Somewhat confident":
						score = 50;
						dispatch(setScores({score,location:answer.location}));

						break;
					case "Slightly confident":
						score = 25;
						dispatch(setScores({score,location:answer.location}));

						break;
					case "Not at all confident":
						score = 10;
						dispatch(setScores({score,location:answer.location}));
						break;
					case "No one in my household has any insurance":
						score = 0;
						dispatch(setScores({score,location:answer.location}));
						break;
					default:
						break;
				}

				break;
			case "8":
				switch (answer.answer) {
					case "Agree strongly":
						score = 100;
						dispatch(setScores({score,location:answer.location}));
						break;
					case "Agree somewhat":
						score = 65;
						dispatch(setScores({score,location:answer.location}));

						break;
					case "Neither agree nor disagree":
						score = 35;
						dispatch(setScores({score,location:answer.location}));

						break;
					case "Disagree somewhat":
						score = 15;
						dispatch(setScores({score,location:answer.location}));

						break;
					case "Disagree strongly":
						score = 0;
						dispatch(setScores({score,location:answer.location}));
						break;
					default:
						break;
				}

				break;
		}
	});
};
