import  { useNavigate, useLocation }from "react-router-dom"

function Home() {
	const navigate = useNavigate()
	return (
		<div className="flex flex-col min-h-screen overflow-hidden bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100">
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
								How are you doing with you money? Take a 2-minute survey
							</p>
							<div
								className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center"
								data-aos="zoom-y-out"
								data-aos-delay="300"
							>
								<button
									onClick={() => navigate("/1")}
									type="button"
									data-mdb-ripple="true"
									data-mdb-ripple-color="light"
									className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
								>
									Take the survey
								</button>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}

export default Home;
