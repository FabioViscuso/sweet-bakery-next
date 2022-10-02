import create from 'zustand';

export interface LoginSlice {
    isLogged: boolean,
    currentUser: {
        username: string,
        email: string,
        accessToken: string,
    },
    loginUser: (loggedUser: string, userEmail: string, userToken: string) => void
    logoutUser: () => void
}

export interface CartSlice {
    items: CartItemWithStats[],
    totalQuantity: number,
    totalAmount: number,
    addToCart: (newItem: CartItem) => void,
    removeFromCart: (itemToRemove: CartItem['id']) => void,
    replaceCart: (newCart: CartItemWithStats[]) => void,
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
                email: '',
                accessToken: '',
            },
            loginUser: (loggedUser: string, userEmail: string, userToken: string) => set(() => {
                return {
                    isLogged: true,
                    currentUser: {
                        username: loggedUser,
                        email: userEmail,
                        accessToken: userToken
                    },
                }
            }),
            logoutUser: () => set(() => {
                localStorage.removeItem('currentUser');
                return {
                    isLogged: false,
                    currentUser: {
                        username: '',
                        email: '',
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
                }
                set(state => { return { totalAmount: Number((state.totalAmount + newItem.price).toFixed(2)) } })
                set(state => { return { totalQuantity: state.totalQuantity + 1 } })
                localStorage.setItem(`cartFor${get().currentUser.username}`, JSON.stringify(get().items))
            },
            removeFromCart: (itemToRemove: CartItem['id']) => {
                // extract the ID
                const id = itemToRemove;

                const item = get().items.find((item) => item.id === id);

                if (item!.quantity === 1) {
                    set((state) => { return { items: state.items.filter((item) => item.id !== id) } })
                } else {
                    item!.quantity--;
                }
                set(state => { return { totalAmount: Number((state.totalAmount - item!.price).toFixed(2)) } })
                set((state) => { return { totalQuantity: state.totalQuantity - 1 } })
                localStorage.setItem(`cartFor${get().currentUser.username}`, JSON.stringify(get().items))
            },
            replaceCart: (newCart: CartItemWithStats[]) => {
                set((state) => {
                    return {
                        items: newCart,
                        totalQuantity: newCart.reduce((acc, obj) => {
                            return acc + obj.quantity
                        }, 0),
                        totalAmount: newCart.reduce((acc, obj) => {
                            return acc + obj.price * obj.quantity
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
