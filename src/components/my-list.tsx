import React from 'react'
import styled, { css } from 'styled-components'
import { MyListItemComponent } from './my-list-item'
import { VariableSizeList  as List } from 'react-window'
import { AutoSizer } from 'react-virtualized'

export interface MyListProps {
  items: MyListItem[]
  useVirtualizedRendering: boolean
}

export interface MyListItem {
  id: string
  description: string
  detail: string
  isSelected: boolean
  selected(id: string): void
}

interface RootProps {
  $useVirtualizedRendering: boolean
}

const Root = styled.div<RootProps>`
  border: solid 1px #616161;
  @media screen and (prefers-color-scheme: light) {
    border-color: lightgrey;
  }
  margin: 0.2em;
  ${(props) => !props.$useVirtualizedRendering && css`
    overflow-y: auto;
  `}
`
const SmallRowHeight = 27
const BigRowHeight = 49

export class MyListComponent extends React.Component<MyListProps> {
  private renderItemBound = this.renderItem.bind(this)
  private renderRowBound = this.renderRow.bind(this)
  private list: List | null = null

  public componentDidUpdate(prevProps: MyListProps) {
    if (prevProps.items && prevProps.items !== this.props.items) {
      const prevSelectedIndex = prevProps.items.findIndex((p) => p.isSelected)
      const newSelectedIndex = this.props.items.findIndex((n) => n.isSelected)
      if (newSelectedIndex < 0) {
        return
      }
      const minIndex = prevSelectedIndex < 0 ? newSelectedIndex : Math.min(prevSelectedIndex || 0, newSelectedIndex)
      this.list?.resetAfterIndex(minIndex)
    }
  }

  public render() {
    return (
    <Root $useVirtualizedRendering={this.props.useVirtualizedRendering}>
      {this.props.useVirtualizedRendering ? null : this.renderNormalList()}
      {this.props.useVirtualizedRendering ? this.renderVirtualizedList() : null}
    </Root>
    )
  }

  private renderNormalList() {
    return this.props.items.map(this.renderItemBound)
  }

  private getItemHeightBound = this.getItemHeight.bind(this)

  private getItemHeight(index: number): number {
    return this.props.items[index].isSelected ? BigRowHeight : SmallRowHeight
  }

  private renderVirtualizedList() {
    const list = <AutoSizer>
      {({ height, width }) => (
      <List
      width={width}
      height={height}
      itemCount={this.props.items.length}
      estimatedItemSize={SmallRowHeight}
      itemSize={this.getItemHeightBound}
      itemData={this.props.items}
      ref={(instance) => this.list = instance}
    >
      {this.renderRowBound}
    </List>)}
    </AutoSizer>
    return list
  }

  private renderRow({data, index, style}: { data: MyListItem[], index: number, style: any }) {
    const item = data[index]
    return <div key={`${item.id}-${item.isSelected}`} style={style}><MyListItemComponent item={item}></MyListItemComponent></div>
  }

  private renderItem(item: MyListItem) {
    return <MyListItemComponent item={item}></MyListItemComponent>
  }
}
