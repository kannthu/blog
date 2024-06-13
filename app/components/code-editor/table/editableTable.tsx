import { Button } from "../../button";
import styled from "styled-components";
import Tippy from "@tippyjs/react";
import { useEffect, useState } from "react";
import { EditableItem, EditableTableItem } from "./item";
import { AiOutlinePlus, AiOutlineDelete } from "react-icons/ai";
import { Monaco } from "@monaco-editor/react";

const Title = styled.label`
  font-size: 0.85rem;
  color: #a3a3a3;
  font-weight: 600;
`;

const simpleMapToEditableItems = (map: {
  [key: string]: string;
}): EditableItem[] => {
  return Object.keys(map).map(key => ({
    key,
    value: map[key],
    isEnabled: true,
  }));
};

type ParametersTableProps = {
  monaco: Monaco | null;
  languageId: string;
  items: EditableItem[];
  notEditableItemsHoverText?: string;
  title: string;
};

const EditableTable = ({
  monaco,
  languageId,
  notEditableItemsHoverText,
  items: initialItems,
  title,
}: ParametersTableProps) => {
  const [items, setItems] = useState<EditableItem[]>([]);

  useEffect(() => {
    // check if last item is empty
    if (initialItems.length > 0) {
      const lastItem = initialItems[initialItems.length - 1];
      if (lastItem.key.length > 0) {
        initialItems.push({
          key: "",
          value: "",
          isEnabled: true,
        });
      }
    } else {
      initialItems.push({
        key: "",
        value: "",
        isEnabled: true,
      });
    }

    setItems(initialItems);
  }, [initialItems]);

  const handleItemChange = (index: number, item: EditableItem) => {
    let newItems = [...items];

    newItems[index] = item;

    // if we detect that it is last item and user is trying to change it
    // we add new empty item
    if (index === items.length - 1) {
      newItems = [...newItems, { key: "", value: "", isEnabled: true }];
    }

    setItems(newItems);
  };

  const handleItemDelete = (index: number) => {
    let newItems = [...items];
    // if we delete last item we just empty it
    if (index === items.length - 1) {
      newItems[index] = { key: "", value: "", isEnabled: true };
    } else {
      newItems.splice(index, 1);
    }
    setItems(newItems);
  };

  const handleRemoveAll = () => {
    const notRemovableItems = items.filter(item => item.notEditable);
    setItems([
      ...notRemovableItems,
      {
        key: "",
        value: "",
        isEnabled: true,
      },
    ]);
  };

  const handleAddItem = () => {
    setItems([...items, { key: "", value: "", isEnabled: true }]);
  };

  const itemsRendered = items.map((item, index) => {
    return (
      <EditableTableItem
        key={index}
        monaco={monaco}
        languageId={languageId}
        index={index}
        item={item}
        notEditableItemsHoverText={notEditableItemsHoverText}
        onItemChange={handleItemChange}
        onItemDelete={handleItemDelete}
      />
    );
  });

  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <p className="mb-0 text-gray-800">{title}</p>
        <div className="flex justify-end">
          <Tippy content="Delete all items">
            <Button variant="link" className="p-1" onClick={handleRemoveAll}>
              <AiOutlineDelete size={18} className="text-gray-800" />
            </Button>
          </Tippy>
          <Tippy content="Add new item">
            <Button variant="link" className="p-1" onClick={handleAddItem}>
              <AiOutlinePlus size={18} className="text-gray-800" />
            </Button>
          </Tippy>
        </div>
      </div>
      <div className="bg-white rounded-lg p-1">{itemsRendered}</div>
    </div>
  );
};

export { EditableTable, simpleMapToEditableItems };
