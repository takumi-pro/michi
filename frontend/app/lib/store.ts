import {
	type Edge,
	type Node,
	type OnConnect,
	type OnEdgesChange,
	type OnNodesChange,
	addEdge,
	applyEdgeChanges,
	applyNodeChanges,
} from "@xyflow/react";
import { create } from "zustand";

const initialEdges: Edge[] = [];

const initialNodes = [
	{
		// TODO: idの形式要検討
		id: Math.random().toString(36).substring(2, 15),
		data: { label: "Hello" },
		position: { x: 0, y: 0 },
		type: "text",
	},
	{
		// TODO: idの形式要検討
		id: Math.random().toString(36).substring(2, 15),
		data: { label: "World" },
		position: { x: 100, y: 100 },
		type: "text",
	},
];

type AppNode = Node;

export type AppState = {
	nodes: AppNode[];
	edges: Edge[];
	onNodesChange: OnNodesChange<AppNode>;
	onEdgesChange: OnEdgesChange;
	onConnect: OnConnect;
	setNodes: (nodes: AppNode[]) => void;
	setEdges: (edges: Edge[]) => void;
	addNode: () => void;
};

// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useStore = create<AppState>((set, get) => ({
	nodes: initialNodes,
	edges: initialEdges,
	onNodesChange: (changes) => {
		set({
			nodes: applyNodeChanges(changes, get().nodes),
		});
	},
	onEdgesChange: (changes) => {
		set({
			edges: applyEdgeChanges(changes, get().edges),
		});
	},
	onConnect: (connection) => {
		console.log(`connection: ${JSON.stringify(connection)}`);
		set({
			edges: addEdge(connection, get().edges),
		});
	},
	setNodes: (nodes) => {
		set({ nodes });
	},
	setEdges: (edges) => {
		set({ edges });
	},
	addNode: () => {
		const newNode = {
			id: Math.random().toString(36).substring(2, 15),
			data: { label: `Node ${get().nodes.length}` },
			position: { x: 0, y: 0 },
			type: "text",
		};

		set({
			nodes: [...get().nodes, newNode],
		});
	},
}));

export default useStore;
