import SubHeader from "./components/SubHeader";

export default function writingsLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<SubHeader />
			{children}
		</>
	);
}
