import React from 'react'
import { MyListItem } from './my-list'
import styled, { css } from 'styled-components'

interface ItemProps {
  $selected: boolean
}

const ItemRoot = styled.div<ItemProps>`
  display: grid;
  ${(props) => props.$selected && css`
    background-color: #455A64; //#616161;
    @media screen and (prefers-color-scheme: light) {
        background-color: #B0BEC5; // #E0E0E0;
      }
  `}
  ${(props) => !props.$selected && css`
    &:hover {
      background-color: #546E7A; // #757575;
      @media screen and (prefers-color-scheme: light) {
        background-color: #CFD8DC; // #EEEEEE;
      }
      cursor: pointer;
    }
  `}
  grid-template-rows: auto auto;
  grid-template-columns: auto auto 1fr;
  grid-template-areas: 'itemId itemDesc' '. itemDetail';
  column-gap: 1em;
  padding-left: 0.25em;
  padding-right: 0.25em;
  padding-top: 0.2em;
  padding-bottom: 0.2em;
`

const ItemId = styled.label`
  grid-area: itemId;
`

const ItemDescription = styled.span`
  grid-area: itemDesc;
`

const ItemDetail = styled.span`
  grid-area: itemDetail;
`

interface MyListItemProps {
  item: MyListItem
}

export class MyListItemComponent extends React.Component<MyListItemProps> {
  private onSelectedBound = this.onSelected.bind(this)
  public render() {
    const item = this.props.item
    return (
      <ItemRoot $selected={item.isSelected} onClick={this.onSelectedBound} >
        <ItemId>{item.id}</ItemId>
        <ItemDescription>{item.description}</ItemDescription>
        {item.isSelected ? <ItemDetail>{item.detail}</ItemDetail> : null}
      </ItemRoot>
      )
  }

  private onSelected() {
    this.props.item.selected(this.props.item.id)
  }
}
