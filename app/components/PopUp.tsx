"use client"

type Props = {
    message: string,
    onClose: () => void
}

export default function PopUp({message, onClose}: Props) {
    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-1 py-3 md:p-8 lg:p-14 bg-(--popup-white) flex self-center flex-col rounded items-center z-50">
            <p className="px-2 pb-2 font-bold text-(--black)">{message}</p>
            <button onClick={onClose} className="p-[0.3rem] md:p-[0.6rem] text-(--white) bg-(--secondary) hover:bg-(--accent) rounded">Close</button>
        </div>
    )
}