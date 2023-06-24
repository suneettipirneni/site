import { Title } from "@/components/Title";
import Image from 'next/image';

import iteratorImage from '@/public/headers/lazy-sequences-dark.png'

function ProjectCard() {
	return (
		<div className="flex flex-col relative space-y-2 rounded-2xl p-5 h-[250px] bg-black justify-end overflow-clip">
			<Image src={iteratorImage} alt='' className='absolute inset-0 h-[80%] w-full object-cover [mask-image:linear-gradient(rgba(0,0,0,1),rgba(0,0,0,1),rgba(0,0,0,1),rgba(0,0,0,0.8),rgba(0,0,0,0.7),rgba(0,0,0,0.6),rgba(0,0,0,0.5),rgba(0,0,0,0.1));]' />
			<div className='z-10 flex-col space-y-2'>
				<Title className="line-clamp-3 max-w-[600px] font-mono text-left text-white">
					MDM-2-DIFFGAN
				</Title>
				<p className='text-white/80'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam</p>
			</div>
		</div>
	);
}

export default function ProjectsPage() {
	return (
		<div className="mx-auto grid max-w-[1000px] md:grid-cols-2 grid-cols-1 gap-4">
			<ProjectCard />
		
		</div>
	);
}
