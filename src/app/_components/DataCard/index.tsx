import BgText from "../BgText";

const DataCard = (props: { title: string, value: string, icon: React.ReactNode, iconClassNames?: string}) => {
    return (
        <div className="bg-white shadow-md p-6 flex rounded-lg justify-between items-center">
            <div className="flex flex-col order-2">
                <span className="text-gray-400 text-lg mb-1">{props.title}</span>
                <span className="text-2xl text-neutral-700 font-semibold">{props.value}</span>
            </div>
            <BgText className={`h-[42] w-[42] flex justify-center items-center rounded-xl order-1 ${props.iconClassNames}`.trim()}>
                {props.icon}
            </BgText>
        </div>
    )
}

export default DataCard;