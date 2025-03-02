import { Handle, type Node, type NodeProps, Position } from "@xyflow/react";
import { useCallback, useRef, useState } from "react";

const handleStyle = { left: 10 };

type CustomProps = Node<
	{
		label: string;
	},
	"label"
>;

function TextNode(props: NodeProps<CustomProps>) {
	const { data, selected } = props;

	const [isEditing, setIsEditing] = useState(true);
	const [value, setValue] = useState(data.label);
	const hasSelectedRef = useRef(true);

	const handleTextAreaRef = (el: HTMLTextAreaElement | null) => {
		if (el && !hasSelectedRef.current) {
			el.select();
			hasSelectedRef.current = true;
		}
	};

	// enterで編集を終了
	const handleKeyDown = (evt: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (evt.key === "Enter" && !evt.shiftKey) {
			evt.preventDefault();
			handleBlur();
		}
	};

	const onChange = useCallback(
		(evt: React.ChangeEvent<HTMLTextAreaElement>) => {
			setValue(evt.target.value);
		},
		[],
	);

	const handleDoubleClick = () => {
		setIsEditing(true);
		hasSelectedRef.current = false;
	};

	const handleBlur = () => {
		setIsEditing(false);
		setValue(value.trimEnd());
		hasSelectedRef.current = true;
	};

	return (
		<>
			<div
				id="node-text"
				className={`bg-white rounded-md p-4 node flex 
          border-2
          ${selected ? "border-cyan-600" : ""}
          ${selected ? "hover:border-cyan-700" : "hover:border-gray-400"}
        `}
				onDoubleClick={handleDoubleClick}
			>
				{isEditing ? (
					<textarea
						id="text"
						name="text"
						value={value}
						onChange={onChange}
						onBlur={handleBlur}
						className="nodrag focus:outline-none field-sizing-content resize-none"
						ref={handleTextAreaRef}
						onKeyDown={handleKeyDown}
					/>
				) : (
					<span
						className="whitespace-pre-wrap"
						onDoubleClick={handleDoubleClick}
					>
						{value}
					</span>
				)}
			</div>
			<Handle type="target" position={Position.Top} id="tt" />
			<Handle type="source" position={Position.Top} id="st" />
			<Handle type="target" position={Position.Left} id="tl" />
			<Handle type="source" position={Position.Left} id="sl" />
			<Handle type="target" position={Position.Bottom} id="tb" />
			<Handle type="source" position={Position.Bottom} id="sb" />
			<Handle type="target" position={Position.Right} id="tr" />
			<Handle type="source" position={Position.Right} id="sr" />
		</>
	);
}

export default TextNode;
