export default function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className='bg-gray-900 text-white py-12'>
			<div className='container mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
					<div>
						<h3 className='text-xl font-bold mb-4'>Mentora</h3>
						<p className='text-gray-400 mb-4'>
							Empowering education through smart mentorship and innovative
							technology.
						</p>
						<p className='text-gray-400'>
							&copy; {currentYear} Mentora. All rights reserved.
						</p>
					</div>

					<div>
						<h3 className='text-lg font-semibold mb-4'>Quick Links</h3>
						<ul className='space-y-2'>
							<li>
								<a
									href='#'
									className='text-gray-400 hover:text-white transition-colors'>
									Home
								</a>
							</li>
							<li>
								<a
									href='#about'
									className='text-gray-400 hover:text-white transition-colors'>
									About
								</a>
							</li>
							<li>
								<a
									href='#features'
									className='text-gray-400 hover:text-white transition-colors'>
									Features
								</a>
							</li>
							<li>
								<a
									href='#testimonials'
									className='text-gray-400 hover:text-white transition-colors'>
									Testimonials
								</a>
							</li>
							<li>
								<a
									href='#contact'
									className='text-gray-400 hover:text-white transition-colors'>
									Contact
								</a>
							</li>
						</ul>
					</div>

					<div>
						<h3 className='text-lg font-semibold mb-4'>Resources</h3>
						<ul className='space-y-2'>
							<li>
								<a
									href='#'
									className='text-gray-400 hover:text-white transition-colors'>
									Blog
								</a>
							</li>
							<li>
								<a
									href='#'
									className='text-gray-400 hover:text-white transition-colors'>
									Help Center
								</a>
							</li>
							<li>
								<a
									href='#'
									className='text-gray-400 hover:text-white transition-colors'>
									Tutorials
								</a>
							</li>
							<li>
								<a
									href='#'
									className='text-gray-400 hover:text-white transition-colors'>
									Documentation
								</a>
							</li>
							<li>
								<a
									href='#'
									className='text-gray-400 hover:text-white transition-colors'>
									API
								</a>
							</li>
						</ul>
					</div>

					<div>
						<h3 className='text-lg font-semibold mb-4'>Legal</h3>
						<ul className='space-y-2'>
							<li>
								<a
									href='#'
									className='text-gray-400 hover:text-white transition-colors'>
									Privacy Policy
								</a>
							</li>
							<li>
								<a
									href='#'
									className='text-gray-400 hover:text-white transition-colors'>
									Terms of Service
								</a>
							</li>
							<li>
								<a
									href='#'
									className='text-gray-400 hover:text-white transition-colors'>
									Cookie Policy
								</a>
							</li>
							<li>
								<a
									href='#'
									className='text-gray-400 hover:text-white transition-colors'>
									GDPR
								</a>
							</li>
						</ul>
					</div>
				</div>

				<div className='border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm'>
					<p>
						Designed with ❤️ for education. Mentora is committed to transforming
						learning experiences worldwide.
					</p>
				</div>
			</div>
		</footer>
	);
}
