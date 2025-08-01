import { Plus } from "lucide-react";

const LargeBtn = (props: {onClick: () => void}) => {
    return (
        <button className="m-3 p-2.5 bg-green-400 hover:bg-green-500 hover:transition-colors transition-colors rounded-lg cursor-pointer" onClick={props.onClick}>
            <Plus color="#01321A" size={22}/>
        </button>
    )
}

export default LargeBtn;