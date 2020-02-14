import {
  types as t,
  getType,
  getSnapshot,
  IStateTreeNode,
  IType
} from "mobx-state-tree";
import MountableModule from "./MountableModule";

export default function createModule<
  C,
  S,
  T,
  ModelInstance extends IStateTreeNode<IType<C, S, T>>
>(
  // Id моудля
  id: string,
  // store  состояния моудля
  store: ModelInstance
) {
  return t
    .compose(
      MountableModule,
      t.model({
        id,
        state: t.optional(getType(store), getSnapshot(store))
      })
    )
    .named(id);
}
