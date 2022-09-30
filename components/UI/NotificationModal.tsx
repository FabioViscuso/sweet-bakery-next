import { createPortal } from "react-dom"
import useStore from "../../store/Store"

const Notification = () => {
    const isOkStatus = useStore(state => state.isOkStatus)
    const message = useStore(state => state.message)

    return (
        <div className="fixed z-50 top-20 left-1/2 translate-x-[-50%] flex flex-col items-center gap-5 p-5 bg-gray-400 bg-opacity-40 rounded-lg">
            <h2 className="font-caveat text-3xl">{isOkStatus ? 'Ok!' : 'Ops! :('}</h2>
            <p className="font-indieflower text-xl">{message}</p>
        </div>
    )
}

export const NotificationModal = () => {
    return (
        <>
            {createPortal(<Notification />, document.getElementById('notificationToast') as HTMLElement)}
        </>
    )
}
