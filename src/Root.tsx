import {Composition, Img, Sequence} from 'remotion';
import {HelloWorld,mySubtopicsSchema , mySchema} from './HelloWorld';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {useCurrentFrame, spring, useVideoConfig} from 'remotion';

export const SubtopicScene: React.FC = () => {
	const frame = useCurrentFrame();
	const fps = 30; // Adjust according to your video fps
	const textDuration = 2 * fps; // Each text is displayed for 2 seconds
	const videoConfig = useVideoConfig();
	const texts = ["Subtopic 1", "Subtopic 2", "Subtopic 3", "Subtopic 4"];
	const imageUrls = ["https://images.wondershare.com/recoverit/2022recoverit-dr/tab-img01.png", "https://recoverit.wondershare.net/images/de/DR/recoverit.png", "https://images.wondershare.com/recoverit/2022recoverit-dr/tab-img01.png", "https://recoverit.wondershare.net/images/de/DR/recoverit.png"];
	const currentTextIndex = Math.min(Math.floor(frame / textDuration), texts.length - 1);
	return (
		<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', height: '100%', fontFamily: 'SF Pro Text, Helvetica, Arial', fontWeight: 'bold', backgroundColor:'white', fontSize: 30, }}>
			<div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', width: '50%'}}>
				{texts.slice(0, currentTextIndex + 1).map((t, i) => {
					return (
						<h1
							key={t}
							style={{
								padding: '30px',
								borderRadius: '15px',
								backgroundColor: 'pink',
								boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.15)',
								marginLeft: 60,
								marginBottom:5,
								marginRight: 100,
								transform: `scale(${spring({
									fps: videoConfig.fps,
									frame: frame - i * textDuration,
									config: {
										damping: 100,
										stiffness: 200,
										mass: 0.5,
									},
								})})`,
								display: 'inline-block',
							}}
						>
							{t}
						</h1>
					);
				})}
			</div>
			{/* <div style={{width: '50%'}}> */}
				<Img src={imageUrls[currentTextIndex]} style={{height: 'auto', right:"0px", width: '60%', transform: `scale(${spring({
									fps: videoConfig.fps,
									frame: frame - currentTextIndex * textDuration,
									config: {
										damping: 100,
										stiffness: 200,
										mass: 0.5,
									},
								})})`}}/>
			</div>
		// </div>
	);
};

export const RemotionRoot: React.FC = () => {
	if (!process.env.GOOGLE_APPLICATION_CREDENTIALS)
		throw new Error(
			'GOOGLE_APPLICATION_CREDENTIALS environment variable is missing. Read the instructions in README.md file and complete the setup.'
		);

	if (!process.env.FIREBASE_API_KEY)
		throw new Error(
			'FIREBASE_API_KEY environment variable is missing. Read the instructions in README.md file and complete the setup.'
		);
	if (!process.env.FIREBASE_AUTH_DOMAIN)
		throw new Error(
			'FIREBASE_AUTH_DOMAIN environment variable is missing. Read the instructions in README.md file and complete the setup.'
		);

	if (!process.env.FIREBASE_PROJECT_ID)
		throw new Error(
			'FIREBASE_PROJECT_ID environment variable is missing. Read the instructions in README.md file and complete the setup.'
		);
	if (!process.env.FIREBASE_STORAGE_BUCKET)
		throw new Error(
			'FIREBASE_STORAGE_BUCKET environment variable is missing. Read the instructions in README.md file and complete the setup.'
		);

	if (!process.env.FIREBASE_MESSAGING_SENDER_ID)
		throw new Error(
			'FIREBASE_MESSAGING_SENDER_ID environment variable is missing. Read the instructions in README.md file and complete the setup.'
		);

	if (!process.env.FIREBASE_APP_ID)
		throw new Error(
			'FIREBASE_APP_ID environment variable is missing. Read the instructions in README.md file and complete the setup.'
		);

	// Create a React Query client to wrap all compositions with.
	const queryClient = new QueryClient();
	return (
		<QueryClientProvider client={queryClient}>
			<Composition
				id="HelloWorld"
				schema={mySchema}
				component={HelloWorld}
				durationInFrames={300}
				fps={30}
				width={1920}
				height={1080}
				defaultProps={{
					titleText:
						'Text to speech on Remotion using  Google Cloud and Firebase!' as const,
					subtitleText:
						'With these powerful tools, what will you build?' as const,
					titleColor: '#2E8AEA' as const,
					voice: 'Woman 1 (US)' as const,
					pitch: 0,
					speakingRate: 1,
				}}
			/>
			<Composition
				id="SubtopicScene"
				schema={mySubtopicsSchema}
				component={SubtopicScene}
				durationInFrames={300} // Adjust according to the desired duration
				fps={30}
				width={1920}
				height={1080}
				defaultProps={
					
					 [
			
					{ text: "Default Subtopic 1", imageUrl: "https://default.com/image1.png" },
					{ text: "Default Subtopic 2", imageUrl: "https://default.com/image2.png" },
					{ text: "Default Subtopic 3", imageUrl: "https://default.com/image2.png" },
					{ text: "Default Subtopic 4", imageUrl: "https://default.com/image2.png" },
					{ text: "Default Subtopic 5", imageUrl: "https://default.com/image2.png" },
					
				]}
			/>
		</QueryClientProvider>
	);
};