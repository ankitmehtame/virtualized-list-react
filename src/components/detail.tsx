import { MyListComponent, MyListItem } from './my-list'
import React from 'react'
import styled from 'styled-components'

interface DetailState {
  items: Item[],
  selectedId?: string
  useVirtualized: boolean
}

interface Item {
  id: string
  description: string
  detail: string
}

const numItemsToSend = 5000

const generateItems = (num: number) => [...Array(num).keys()].map((i) => ({
  id: `Id: ${Math.ceil(Math.random() * 100000).toString().padStart(5, '0')}`,
  description: `This is item number ${i + 1}`,
  detail: `Pakage number: ${Math.ceil(Math.random() * 1000)}`
} as Item))

const Root = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  row-gap: 0.5em;
  overflow-y: auto;
  margin-left: 0.25em;
  margin-right: 0.25em;
`

const InputsDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(5, auto) 1fr;
  column-gap: 1em;
  align-items: center;
`

export class DetailComponent extends React.Component<{}, DetailState> {
  private onLoadClickBound = this.onLoadClick.bind(this)
  private onClearClickBound = this.onClearClick.bind(this)

  constructor(props: any) {
    super(props)
    this.state = {
      items: [],
      selectedId: undefined,
      useVirtualized: true
    }
  }

  public render() {
    const itemsToSend = this.state.items.map((item) => ({
      id: item.id,
      description: item.description,
      detail: item.detail,
      isSelected: this.state.selectedId === item.id,
      selected: (id) => this.onItemSelected(id)
    } as MyListItem))
    return (
      <Root>
        <InputsDiv>
          <div>
            <input id='useVirtualized' type='checkbox' checked={this.state.useVirtualized} onChange={() => this.setState({ useVirtualized: !this.state.useVirtualized, items: [], selectedId: undefined })} value='Virtualized' />
            <label htmlFor='useVirtualized'>Use virtualization</label>
          </div>
          <button onClick={this.onLoadClickBound}>Load Data</button>
          <button onClick={this.onClearClickBound}>Clear</button>
        </InputsDiv>
        <MyListComponent items={itemsToSend} useVirtualizedRendering={this.state.useVirtualized}>
        </MyListComponent>
      </Root>
    )
  }

  private onItemSelected(id: string) {
    this.setState({ selectedId: id })
  }

  private onLoadClick() {
    const generatedItems = generateItems(numItemsToSend)
    this.setState({ items: generatedItems, selectedId: generatedItems[0].id })
  }

  private onClearClick() {
    this.setState({ items: [], selectedId: undefined })
  }
}
