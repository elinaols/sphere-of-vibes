"use client"

type Props = {
    message: string,
    onClose: () => void
}

export default function PopUp({message, onClose}: Props) {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="w-[70%] sm:w-1/2 p-6 sm:p-8 lg:p-12 bg-white/90 backdrop-blur-md flex self-center flex-col rounded items-center">
                <p className="px-2 pb-2 md:pb-4 font-bold text-(--black)">{message}</p>
                <button onClick={onClose} className="p-[0.3rem] md:p-[0.6rem] text-(--white) bg-(--secondary) hover:bg-(--accent) rounded">Stäng</button>
            </div>
        </div>
    )
}