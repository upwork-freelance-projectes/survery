import { useNavigate, useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAnswer } from "../questionSlice";
import { setAnswers, updateAnswers } from "../questionsSlice";
import { setProgress } from "../progessSlice";
import { score } from "../scoring";
import { setScores } from "../questionsSlice";

function Question() {
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useDispatch();
	const { questions } = useSelector(state => state.questions);
	const { answers } = useSelector(state => state.questions);
	const { progress } = useSelector(state => state.progress);
	// const [clickedBack, setBack] = useState(false)
	const [question, setQuestion] = useState({});
	const [prog, setProg] = useState(progress);
	console.log(answers, "ama sanasewr");

	useEffect(
		params => {
			setQuestion(questions[Number(location.pathname.charAt(1))]);
			setProg(progress);
			// : setQuestion(questions[2]);
		},
		[location],
	);

	return (
		<>
			<div className="h-1 w-full bg-gray-300">
				<div bg-gray-200 rounded-full></div>
				<div
					className={`bg-blue-600 fixed text-xs font-medium text-blue-100 text-center w-60 p-0.5 leading-none rounded-l-full w-69`}
					// style={{"width": 25%}}
					style={{ width: `${Math.round(prog)}%` }}
				>
					{Math.round(prog)}%
				</div>
			</div>

			<div className="flex flex-col min-h-screen overflow-hidden bg-indigo-100  ">
				<main className="flex-grow">
					<div className="pt-32 pb-12 md:pt-40 md:pb-20">
						{/* Section header */}
						<div className="text-center pb-12 md:pb-16">
							{/* <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4" data-aos="zoom-y-out">Make your website <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">wonderful</span></h1> */}
							<div className="max-w-3xl mx-auto">
								<p
									className="text-3xl text-center mb-8 p-8"
									data-aos="zoom-y-out"
									data-aos-delay="150"
								>
									{question ? `${question.question}` : "no question set"}
								</p>
								<div className="justify-center flex">
									<ul>
										{question.answers ? (
											question.answers.map((answer, i) => (
												<li className="px-6 py-2 w-full 600" key={i}>
													<div className="hover:scale-110 ">
														<Link
															to={
																Number(location.pathname.charAt(1)) < 8
																	? `/${
																			Number(location.pathname.charAt(1)) + 1
																	  }`
																	: `/result`
															}
															onClick={click => {
																let pro =
																	100 -
																	((8 - Number(location.pathname.charAt(1))) /
																		8) *
																		100;
																// dispatch(
																// 	setAnswer({
																// 		location: location.pathname.charAt(1),
																// 		answer: answer,
																// 	}),
																// );
																dispatch(setProgress(pro));

																if (answers.length) {
																	let index = answers.findIndex(ans => {
																		console.log(
																			ans.location,
																			location.pathname.charAt(1),
																			ans.location ==
																				location.pathname.charAt(1),
																		);
																		return (
																			ans.location ==
																			location.pathname.charAt(1)
																		);
																	});

																	if (index == -1) {
																		return dispatch(
																			setAnswers({
																				location: location.pathname.charAt(1),
																				answer: answer,
																				i: index,
																			}),
																		);
																	} else {
																		dispatch(
																			updateAnswers({
																				index: index,
																				location: location.pathname.charAt(1),
																				answer: answer,
																				i: index,
																			}),
																		);
																	}

																	if (location.pathname.charAt(1) == "8") {
																		score(answers, dispatch, setScores);
																	}
																} else {
																	dispatch(
																		setAnswers({
																			location: location.pathname.charAt(1),
																			answer: answer,
																			i: i,
																		}),
																	);
																}
															}}
														>
															<button
																// onClick={() => navigate("/Q2")}
																type="button"
																className="w-auto px-6 py-2 border-2 
																border-[#d3d4d5] text-[#646464]-600  
																text-xs leading-tight rounded-full hover:border-blue-500 hover:scale-125 focus:outline-none focus:ring-0 transition duration-500 ease-in-out"
															>
																{answer}
															</button>
														</Link>
													</div>
												</li>
											))
										) : (
											<li>
												<div className="hover:scale-110">
													<button
														onClick={() => navigate("/")}
														type="button"
														className="inline-block w-30 px-6 py-2 border-2 border-gray-300 text-black-500 font-medium text-xs leading-tight uppercase rounded-full hover:border-green-500  hover:text-green-400 focus:outline-none focus:ring-0 transition duration-300 ease-in-out"
													>
														no answer
													</button>
												</div>
											</li>
										)}
									</ul>
								</div>
								<div className="flex flex-row mx-auto">
									<Link
										to={`/${
											location.pathname.charAt(1) !== "1"
												? Number(location.pathname.charAt(1)) - 1
												: ""
										}`}
										onClick={() => {
											let pro =
												100 -
												((8 - Number(location.pathname.charAt(1))) / 8) * 100;

											dispatch(setProgress(pro));
										}}
									>
										<button
											type="button"
											className="fixed z-90 bottom-10 right-20 bg-gray-800 py-2 border-l rounded-l-md drop-shadow-lg px-3 flex justify-center items-center text-white  hover:bg-blue-700 hover:drop-shadow-2xl duration-100"
										>
											<div className="flex flex-row align-middle">
												<svg
													className="w-5 mr-2"
													fill="currentColor"
													viewBox="0 0 20 20"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														// fill-rule="evenodd"
														d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
														// clip-rule="evenodd"
													></path>
												</svg>
												{/* <p className="ml-2">Prev</p> */}
											</div>
										</button>
									</Link>
									<Link
										to={
											Number(location.pathname.charAt(1)) < 8
												? `/${Number(location.pathname.charAt(1)) + 1}`
												: "/result"
										}
										onClick={() => {
											let pro =
												100 -
												((8 - Number(location.pathname.charAt(1))) / 8) * 100;
											// score(answers, dispatch, setScores);
											dispatch(setProgress(pro));
										}}
									>
										<button
											type="button"
											className="fixed z-90 disabled bottom-10 right-7 bg-gray-800 py-2 border-l rounded-r-md drop-shadow-lg px-3 flex justify-center items-center text-white  hover:bg-blue-700 hover:drop-shadow-2xl duration-100"
										>
											<div className="flex flex-row align-middle">
												{/* <span className="mr-2">Next</span> */}
												<svg
													className="w-5 ml-2"
													fill="currentColor"
													viewBox="0 0 20 20"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														// fill-rule="evenodd"
														d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
														// clip-rule="evenodd"
													></path>
												</svg>
											</div>
										</button>
									</Link>
								</div>
								{/* <button
								onclick="buttonHandler()"
								title="Contact Sale"
								className="fixed z-90 bottom-10 right-8 bg-blue-600 w-20 h-20 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:bg-blue-700 hover:drop-shadow-2xl hover:animate-bounce duration-300"
							>
								&#9993;
							</button> */}
							</div>
						</div>
					</div>
				</main>
			</div>
		</>
	);
}

export default Question;
