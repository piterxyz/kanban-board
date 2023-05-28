import * as React from 'react';
import DefaultData from '../assets/DefaultData.json';

const initialBoard = {
    labels: localStorage.getItem('labels') ? JSON.parse(localStorage.getItem('labels')) : DefaultData.labels,
    lists: localStorage.getItem('lists') ? JSON.parse(localStorage.getItem('lists')) : DefaultData.lists,
    modal: undefined
}
const BoardContext = React.createContext(initialBoard);

function boardReducer(state, action) {
    switch (action.type) {
        case 'modal_updated': {
            return {
                ...state,
                modal: action.modal
            }
        }
        case 'card_updated': {
            return {
                ...state,
                lists: state.lists.map(list => {
                    if (list.id == action.listId) {
                        return {
                            ...list,
                            cards: list.cards.map(card => {
                                if (card.id == action.card.id) {
                                    return action.card
                                }
                                return card
                            })
                        }
                    }
                    return list
                })
            }
        }
        case 'card_created': {
            return {
                ...state,
                lists: state.lists.map(list => {
                    if (list.id == action.listId) {
                        return {
                            ...list,
                            cards: [
                                ...list.cards,
                                action.card
                            ]
                        }
                    }
                    return list
                })
            }
        }
        case 'card_created_after': {
            return {
                ...state,
                lists: state.lists.map(list => {
                    if (list.id == action.listId) {
                        return {
                            ...list,
                            cards: [
                                ...list.cards.slice(0, action.index),
                                action.card,
                                ...list.cards.slice(action.index)
                            ]
                        }
                    }
                    return list
                })
            }
        }
        case 'card_removed': {
            return {
                ...state,
                lists: state.lists.map(list => {
                    if (list.id == action.listId) {
                        return {
                            ...list,
                            cards: list.cards.filter(card => card.id !== action.cardId)
                        }
                    }
                    return list
                })
            }
        }
        case 'label_updated': {
            return {
                ...state,
                labels: state.labels.map(label => {
                    if (label.id == action.label.id) {
                        return action.label
                    }
                    return label
                })
            }
        }
        case 'list_created': {
            return {
                ...state,
                lists: [
                    ...state.lists,
                    action.newList
                ]
            }
        }
        case 'list_removed': {
            return {
                ...state,
                lists: state.lists.filter(list => list.id != action.listId)
            }
        }
        case 'list_changed_pos': {
            const updatedLists = state.lists;
            const [removedList] = updatedLists.splice(action.oldPos, 1)
            updatedLists.splice(action.newPos, 0, removedList)

            return {
                ...state,
                lists: updatedLists
            }
        }
        case 'list_changed_title': {
            return {
                ...state,
                lists: state.lists.map(list => {
                    if (list.id == action.listId) {
                        return {
                            ...list,
                            title: action.newTitle
                        }
                    }
                    return list
                })
            }
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}

function BoardProvider({ children }) {
    const [state, dispatch] = React.useReducer(boardReducer, initialBoard)

    const modalUpdateHandler = (modal) => {
        dispatch({ type: 'modal_updated', modal })
    }

    const cardUpdateHandler = (listId, card) => {
        dispatch({ type: 'card_updated', listId, card })
    }

    const cardCreateHandler = (listId, card) => {
        dispatch({ type: 'card_created', listId, card })
    }

    const cardCreateAfterHandler = (listId, card, index) => {
        dispatch({ type: 'card_created_after', listId, card, index })
    }

    const cardRemoveHandler = (listId, cardId) => {
        dispatch({ type: 'card_removed', listId, cardId })
    }

    const labelUpdateHandler = (label) => {
        dispatch({ type: 'label_updated', label })
    }

    const listCreateHandler = (newList) => {
        dispatch({ type: 'list_created', newList })
    }

    const listRemoveHandler = (listId) => {
        dispatch({ type: 'list_removed', listId })
    }

    const listChangePosHandler = (oldPos, newPos) => {
        dispatch({ type: 'list_changed_pos', oldPos, newPos })
    }

    const listChangeTitleHandler = (listId, newTitle) => {
        dispatch({ type: 'list_changed_title', listId, newTitle })
    }

    localStorage.setItem('lists', JSON.stringify(state.lists));

    const boardContext = {
        labels: state.labels,
        lists: state.lists,
        modal: state.modal,
        modalUpdate: modalUpdateHandler,
        cardUpdate: cardUpdateHandler,
        cardCreate: cardCreateHandler,
        cardCreateAfter: cardCreateAfterHandler,
        cardRemove: cardRemoveHandler,
        labelUpdate: labelUpdateHandler,
        listCreate: listCreateHandler,
        listRemove: listRemoveHandler,
        listChangePos: listChangePosHandler,
        listChangeTitleHandler: listChangeTitleHandler
    }

    return (
        <BoardContext.Provider value={boardContext}>
            {children}
        </BoardContext.Provider>
    )
}

function useBoard() {
    const context = React.useContext(BoardContext)

    if (context === undefined) {
        throw new Error('useBoard must be used within a BoardProvider')
    }

    return context
}

export { BoardProvider, useBoard };