import { increment, decrement } from '../store/counter/counterActions'
import { AppState } from '../store'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import React from 'react'

export const Counter = ({ count, add, remove }) => {
    const onAdd = () => add()
    const onRemove = () => remove()
    return (
      <div>
        <h2 data-testid="counter-output">Count: {count}</h2>
        <button onClick={onAdd}>
           Add
        </button>
        <button onClick={onRemove}>
           Remove
        </button>
      </div>
    )
  }

const mapStateToProps = ({ counter }: AppState) => ({
  count: counter.count,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  add: () => dispatch(increment),
  remove: () => dispatch(decrement),
})

export const HomepageCounter = connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)