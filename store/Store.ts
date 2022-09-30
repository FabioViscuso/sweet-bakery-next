import { INSPECT_MAX_BYTES } from 'buffer';
import create from 'zustand';

export interface LoginSlice {
    isLogged: boolean,
    currentUser: {
        username: string,
        accessToken: string,
    }
    loginUser: (loggedUser: string, userToken: string) => void
    logoutUser: () => void
}

export interface CartSlice {
    items: CartItemWithStats[],
    totalQuantity: number,
    totalAmount: number,
    addToCart: Function,
    removeFromCart: Function,
    replaceCart: Function,
}

export interface CartItem {
    id: string,
    imgUrl: string,
    title: string,
    description: string,
    price: number,
}

export interface CartStats {
    quantity: number,
    totalAmount: number
}

export type CartItemWithStats = CartItem & CartStats;

export interface NotificationSlice {
    isOkStatus: boolean,
    message: string,
    setNotificationContent: (isOk: boolean, message: string) => void
}

export interface UiSlice {
    isLoginModalOpen: boolean,
    isSignupModalOpen: boolean,
    isNotificationPopupOpen: boolean,
    isCartVisible: boolean,
    showLoginModal: () => void,
    hideLoginModal: () => void,
    showSignupModal: () => void,
    showCart: () => void,
    hideCart: () => void,
    hideSignupModal: () => void,
    showNotificationPopup: () => void,
    hideNotificationPopup: () => void,
}

export type GeneralState = LoginSlice & CartSlice & NotificationSlice & UiSlice

const useStore = create<GeneralState>(
    (set, get) =>
    (
        {
            /* USER */
            isLogged: false,
            currentUser: {
                username: '',
                accessToken: '',
            },
            loginUser: (loggedUser: string, userToken: string) => set(() => {
                return {
                    isLogged: true,
                    currentUser: {
                        username: loggedUser,
                        accessToken: userToken
                    }
                }
            }),
            logoutUser: () => set(() => {
                return {
                    isLogged: false,
                    currentUser: {
                        username: '',
                        accessToken: ''
                    }
                }
            }),
            /* CART */
            items: [],
            totalQuantity: 0,
            totalAmount: 0,
            addToCart: (newItem: CartItem) => {
                const existingItem = get().items.find(item => item.id === newItem.id)
                if (!existingItem && typeof existingItem === 'undefined') {
                    const toAdd: CartItemWithStats = { ...newItem, quantity: 1, totalAmount: newItem.price };
                    set(state => {
                        return {
                            items: [...state.items, toAdd]
                        }
                    })
                } else {
                    existingItem.quantity++;
                    existingItem.totalAmount += newItem.price
                }
                set(state => {
                    return {
                        totalQuantity: state.totalQuantity + 1
                    }
                })
            },
            removeFromCart: (itemToRemove: CartItem['id']) => {

                // extract the ID
                const id = itemToRemove;

                // remove funct is only available in places where "existingItem" exists
                // so no need to check if the element is undefined
                const existingItem = get().items.find((item) => item.id === id);

                if (existingItem!.quantity === 1) {
                    set((state) => { return { items: state.items.filter((item) => item.id !== id) } })
                } else {
                    existingItem!.quantity--;
                    existingItem!.totalAmount -= existingItem!.price;
                }
                set((state) => { return { totalQuantity: state.totalQuantity - 1 } })
            },
            replaceCart: () => {
                set((state) => {
                    return {
                        totalQuantity: state.items.reduce((acc, obj) => {
                            return acc + obj.quantity
                        }, 0)
                    }
                })
            },

            /* NOTIFICATION */
            isOkStatus: false,
            message: '',
            isNotificationPopupOpen: false,
            setNotificationContent: (isOk, message) => set((state) => ({ isOkStatus: isOk, message: message })),
            /* UI COMPONENTS */
            isLoginModalOpen: false,
            isSignupModalOpen: false,
            isCartVisible: false,
            showLoginModal: () => set((state) => ({ isLoginModalOpen: state.isLoginModalOpen = true })),
            hideLoginModal: () => set((state) => ({ isLoginModalOpen: state.isLoginModalOpen = false })),
            showSignupModal: () => set((state) => ({ isSignupModalOpen: state.isSignupModalOpen = true })),
            hideSignupModal: () => set((state) => ({ isSignupModalOpen: state.isSignupModalOpen = false })),
            showCart: () => set((state) => ({ isCartVisible: state.isCartVisible = true })),
            hideCart: () => set((state) => ({ isCartVisible: state.isCartVisible = false })),
            showNotificationPopup: () => set((state) => ({ isNotificationPopupOpen: state.isNotificationPopupOpen = true })),
            hideNotificationPopup: () => set((state) => ({ isNotificationPopupOpen: state.isNotificationPopupOpen = false })),
        }
    )
)

export default useStore;
