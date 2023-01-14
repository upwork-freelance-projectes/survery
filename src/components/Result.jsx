import { useNavigate, useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { score } from "../scoring";
import html2canvas from "html2canvas";
import {
	VictoryPie,
	VictoryAnimation,
	VictoryLabel,
	VictoryContainer,
	VictoryChart,
} from "victory";
import { setScores } from "../questionsSlice";
import {
	RadialChart,
	LabelSeries,
	makeVisFlexible,
	XYPlot,
	XAxis,
	YAxis,
	VerticalGridLines,
	HorizontalGridLines,
	HorizontalBarSeries,
	HorizontalBarSeriesCanvas,
} from "react-vis";
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";

function Result() {
	const ResponsiveChart = makeVisFlexible(RadialChart);
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useDispatch();
	const { questions } = useSelector(state => state.questions);
	const { scores } = useSelector(state => state.questions);

	const { answers } = useSelector(state => state.questions);
	const { progress } = useSelector(state => state.progress);
	// const [clickedBack, setBack] = useState(false)
	const [question, setQuestion] = useState({});
	const [prog, setProg] = useState(progress);
	// console.log(answers, "ama sanasewr");
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
			setQuestion(questions[Number(location.pathname.charAt(1))]);
			setProg(progress);
			// : setQuestion(questions[2]);
		},
		[location],
	);

	function saveImage() {
		var input = document.getElementById("canvas");
		html2canvas(input).then(canvas => {
			let imgData = canvas
				.toDataURL("image/png")
				.replace("image/png", "image/octet-stream");
			downloadURL(imgData);
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

			<div className="flex flex-col min-h-screen overflow-hidden bg-indigo-100  ">
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
							<div className="max-w-3xl mx-auto" id="canvas">
								<ResponsiveChart
									// className={"donut-chart-example"}
									innerRadius={100}
									radius={140}
									getAngle={d => d.angle}
									colorType="literal"
									data={[
										{
											angle: Math.round(scores.reduce((x, y) => x + y, 0) / 8),

											color: "rgb(121, 199, 227)",
										},
										{
											angle:
												100 - Math.round(scores.reduce((x, y) => x + y, 0) / 8),
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
													scores.reduce((x, y) => x + y, 0) / 8,
												)}%`,
												style: { textAnchor: "middle", color: "black", fontSize: "30px" },
											},
										]}
									/>
									{/* {value !== false && <Hint value={value} />} */}
								</ResponsiveChart>

								<button
									// onClick={() => navigate("/Q2")}
									onClick={() => score(answers, dispatch, setScores)}
									type="button"
									className="w-auto px-6 py-2 border-2 
																border-[#d3d4d5] text-[#646464]-600  
																text-xs leading-tight rounded-full hover:border-blue-500 hover:scale-125 focus:outline-none focus:ring-0 transition duration-500 ease-in-out"
								>
									calculate
								</button>
								<XYPlot width={700} height={300}>
									<VerticalGridLines />
									<HorizontalGridLines />
									{/* <XAxis />
									<YAxis /> */}
									<HorizontalBarSeries
										data={individualScores}
										showLabels={true}
									/>
									<LabelSeries
										data={individualLabels}
										getLabel={score => score.x}
									/>

									{/* <LabelSeries
										data={individualValues}
										getLabel={score => score.x}
										labelAnchorX={100}
										labelAnchorY={100}
									/> */}
								</XYPlot>
								<button onClick={() => saveImage()}>Save</button>

								<p>{`FinHealth Score ${Math.round(
									scores.reduce((x, y) => x + y, 0) / 8,
								)}`}</p>

								<p>{`Spend Score ${Math.round(
									(scores[0] + scores[1]) / 2,
								)}`}</p>
								<p>{`Save Score ${Math.round((scores[2] + scores[3]) / 2)}`}</p>
								<p>{`Borrow Score ${Math.round(
									(scores[4] + scores[5]) / 2,
								)}`}</p>
								<p>{`Plan Score ${Math.round((scores[6] + scores[7]) / 2)}`}</p>
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
