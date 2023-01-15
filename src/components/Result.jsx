import { useNavigate, useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { score } from "../scoring";
import html2canvas from "html2canvas";
import { BarChart } from "./Bar";
import { setScores } from "../questionsSlice";
import {
	RadialChart,
	LabelSeries,
	makeVisFlexible,
} from "react-vis";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { jsPDF } from "jspdf";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	// Legend,
	ChartDataLabels,
);

const options = {
	responsive: true,
	plugins: {
		// legend: {
		// 	position: "bottom",
		// },
		title: {
			display: true,
			text: "Sub scores",
		},
		datalabels: {
			color: "black",
		},
	},
	scales: {
		x: {
			border: {
				display: false,
			},
			grid: {
				display: false,
			},
		},
		y: {
			border: {
				display: false,
			},
			grid: {
				display: false,
			},
			ticks: {
				display: false,
			},
		},
	},
	// categoryPercentage: 0.5, // notice here
	// barPercentage: 0.5,
};

const labels = ["Spending", "Saving", "Borrowing", "Planing"];



// export function BarChart({ scores }) {
	
// 	return <Bar options={options} data={data} />;
// }

function Result() {
	const [results, setResults] = useState(false)
	const ResponsiveChart = makeVisFlexible(RadialChart);
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useDispatch();
	const { questions } = useSelector(state => state.questions);
	const { scores } = useSelector(state => state.questions);

	const { answers } = useSelector(state => state.questions);
	const { progress } = useSelector(state => state.progress);
	// const [clickedBack, setBack] = useState(false)
	
	const [prog, setProg] = useState(progress);
	// console.log(scores, "result page");
	const individualScores = [
		{
			y: 1,
			x: Math.round((scores[0] + scores[1]) / 2),
			label: "Spend score",
		},
		{
			y: 2,
			x: Math.round((scores[2] + scores[3]) / 2),
			label: "Save score ",
		},
		{
			y: 3,
			x: Math.round((scores[4] + scores[5]) / 2),
			label: "Borrow score",
		},
		{
			y: 4,
			x: Math.round((scores[6] + scores[7]) / 2),
			label: "Plan scored",
		},
	];

	const data = {
		labels,
		datasets: [
			{
				label: "Scores",
				data: scores.length ? [
					Math.round((scores[0].score + scores[1].score) / 2),

					Math.round((scores[2].score + scores[3].score) / 2),

					Math.round((scores[4].score + scores[5].score) / 2),

					Math.round((scores[6].score + scores[7].score) / 2),
				] : [],
				// backgroundColor: "rgb(121, 199, 227)",
				backgroundColor: [
					"rgb(255, 99, 132)",
					"rgb(255, 159, 64)",
					"rgb(255, 205, 86)",
					"rgb(75, 192, 192)",
					"rgb(54, 162, 235)",
					"rgb(153, 102, 255)",
					"rgb(201, 203, 207)",
				],
				// borderColor: "rgb(121, 199, 227)",
				// borderWidth: 5,
				// barThickness: 40,
				// barPercentage: 0.5,
				categoryPercentage: 0.5, // notice here
				barPercentage: 0.5, // notice here
			},
		],
	};

	const individualLabels = individualScores.map((score, idx) => ({
		x: `${score.label}             ${score.x}%`,
		y: score.y,
		style: { textAnchor: "start", color: "black" },
	}));
	const individualValues = individualScores.map((score, idx) => ({
		x: score.x,
		y: score.y,
		// style: { textAnchor: "middle", color: "black" },
	}));

	useEffect(
		params => {
			// score(answers, dispatch, setScores);
			setProg(progress);

			// : setQuestion(questions[2]);
		});

	function saveImage() {
		var input = document.getElementById("canvas");
		html2canvas(input, {
			allowTaint: true,
			logging: true,
			taintTest: false,
			scrollY: -window.scrollY,
			// scale: 5,
			// onrendered: save /*0.4.1*/,
		}).then(canvas => {
			let imgData = canvas.toDataURL("image/png");
			// .replace("image/png", "image/octet-stream");
			let doc = new jsPDF();
			// doc.addPage("png")
			doc.addImage(imgData, "PNG", 10, 10);
			doc.save("results-file.pdf");

			// downloadURL(imgData);
		});
	}

	function downloadURL(imgData) {
		var a = document.createElement("a");
		a.href = imgData.replace("image/png", "image/octet-stream");
		a.download = "graph.png";
		a.click();
	}

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

			<div
				className="flex flex-col min-h-screen overflow-hidden bg-indigo-100"
				id="canvas"
			>
				<main className="flex-grow">
					<div className="pt-32 pb-12 md:pt-40 md:pb-20">
						{/* Section header */}
						<div className="text-center pb-12 md:pb-16">
							<h1
								className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4"
								data-aos="zoom-y-out"
							>
								<span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
									FinHealth score
								</span>
							</h1>
							<div className="max-w-3xl mx-auto">
								{results ? (
									<>
										<ResponsiveChart
											// className={"donut-chart-example"}
											innerRadius={100}
											radius={140}
											getAngle={d => d.angle}
											colorType="literal"
											data={[
												{
													angle: Math.round(
														scores.reduce((x, y) => x + y.score, 0) / 8,
													),
													color: "rgb(121, 199, 227)",
												},
												{
													angle:
														100 -
														Math.round(
															scores.reduce((x, y) => x + y.score, 0) / 8,
														),
													color: "transparent",
												},
												// { angle: 2 },
											]}
											//onValueMouseOver={v => this.setState({value: v})}
											// onSeriesMouseOut={v => this.setState({value: false})}
											// width={400}
											height={300}
											padAngle={0.04}
											showLabels={true}
											// center={{ x: 400, y: 400 }}
										>
											<LabelSeries
												data={[
													{
														x: 0,
														y: 0,
														label: `${Math.round(
															scores.reduce((x, y) => x + y.score, 0) / 8,
														)}%`,
														style: {
															textAnchor: "middle",
															color: "black",
															fontSize: "30px",
														},
													},
												]}
											/>
											{/* {value !== false && <Hint value={value} />} */}
										</ResponsiveChart>
										<Bar options={options} data={data} />
										<button
											className="w-auto px-6 py-2 border-2 
																border-[#d3d4d5] text-[#646464]-600  
																text-xs leading-tight rounded-full hover:border-blue-500 hover:scale-125 focus:outline-none focus:ring-0 transition duration-500 ease-in-out"
											 onClick={() => saveImage()}
										>
											Save Export Results
										</button>
									</>
								) : (
									<button
										className="w-auto px-6 py-2 border-2 
																border-[#d3d4d5] text-[#646464]-600  
																text-xs leading-tight rounded-full hover:border-blue-500 hover:scale-125 focus:outline-none focus:ring-0 transition duration-500 ease-in-out"
										onClick={() => {
											score(answers, dispatch, setScores);
											setResults(true);
										}}
									>
										Click to view results
									</button>
								)}
								{/* <svg viewBox="0 0 400 400" width="100%" height="100"> */}
							</div>
						</div>
					</div>
				</main>
			</div>
		</>
	);
}

export default Result;
