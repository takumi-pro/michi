import { Background, ReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Form, useFetcher } from "react-router";
import { useShallow } from "zustand/shallow";
import TextNode from "~/components/nodes/TextNode";
import { Button } from "~/components/ui/button";
import useStore, { type AppState } from "~/lib/store";
import type { Route } from "./+types/_index";

const nodeTypes = {
	text: TextNode,
};

const selector = (state: AppState) => ({
	nodes: state.nodes,
	edges: state.edges,
	onNodesChange: state.onNodesChange,
	onEdgesChange: state.onEdgesChange,
	onConnect: state.onConnect,
	addNode: state.addNode,
});

export async function clientAction({ request }: Route.ClientActionArgs) {
	// const formData = await request.formData();
	// const title = formData.get("title");
	// const baseUrl = `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(title)}&orderBy=newest&maxResults=1`
	// const response = await fetch(baseUrl);
	// const data = await response.json();
	// console.log(data);
	// return data;
}

export default function Index({ actionData }: Route.ComponentProps) {
	const { nodes, edges, onNodesChange, onEdgesChange, onConnect, addNode } =
		useStore(useShallow(selector));
	const fetcher = useFetcher();

	return (
		<div className="w-screen h-screen">
			<ReactFlow
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				onConnect={onConnect}
				nodeTypes={nodeTypes}
				fitView
			>
				<Button
					className="absolute top-4 left-4 z-50 cursor-pointer"
					onClick={addNode}
				>
					Add Node
				</Button>
				{/* 書籍検索 */}
				<div className="absolute top-4 left-80 z-50">
					<fetcher.Form method="post">
						<input type="text" name="title" />
						<button type="submit">検索</button>
						{/* {fetcher.state !== "idle" ? <p>送信中...</p> : <p>送信完了！</p>} */}
						{actionData && <p>{JSON.stringify(actionData)}</p>}
					</fetcher.Form>
				</div>
				<Background />
			</ReactFlow>
		</div>
	);
}
