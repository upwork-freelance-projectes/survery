import React from "react";
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

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	// Legend,
    ChartDataLabels
);

export const options = {
	responsive: true,
	plugins: {
		// legend: {
		// 	position: "bottom",
		// },
		title: {
		  display: true,
		  text: 'Sub scores',
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



export function BarChart({scores}) {
    const data = {
			labels,
			datasets: [
				{
					label: "Scores",
					data: scores,
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
	return <Bar options={options} data={data} />;
}
