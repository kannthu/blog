import { Button } from "../../../components/button";
import styled from "styled-components";
import Tippy from "@tippyjs/react";
import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { EditorSmallInput } from "../../../components/inputCodeEditor";
import { Monaco } from "@monaco-editor/react";
import { Col } from "../../../components/col";

const ItemKeyField = styled(Col)`
  display: flex;
  border-right: 1px solid #e8e8e8;
  border-radius: 8px;
`;

export type EditableItem = {
  key: string;
  value: string;
  isEnabled: boolean;
  notEditable?: boolean;
};

type EditableItemProps = {
  monaco: Monaco | null;
  languageId: string;
  index: number;
  item: EditableItem;
  notEditableItemsHoverText?: string;
  onItemChange: (index: number, item: EditableItem) => void;
  onItemDelete: (index: number) => void;
};

const EditableTableItem = ({
  monaco,
  languageId,
  index,
  item,
  notEditableItemsHoverText,
  onItemChange,
  onItemDelete,
}: EditableItemProps) => {
  const [key, setKey] = useState(item.key);
  const [value, setValue] = useState(item.value);
  const [isEnabled, setIsEnabled] = useState(item.isEnabled);

  useEffect(() => {
    setKey(item.key);
    setValue(item.value);
    setIsEnabled(item.isEnabled);
  }, [item]);

  const handleKeyChange = (newKey: string) => {
    setKey(newKey);
    onItemChange(index, { ...item, key: newKey, value, isEnabled });
  };

  const handleValueChange = (newValue: string) => {
    setValue(newValue);
    onItemChange(index, { ...item, key, value: newValue, isEnabled });
  };

  const handleIsEnabledClick = () => {
    setIsEnabled(!isEnabled);
    onItemChange(index, { ...item, key, value, isEnabled: !isEnabled });
  };

  const handleDeleteClick = () => {
    onItemDelete(index);
  };

  return (
    <div className="flex py-1 px-2 flex-grow space-x-2 rounded-lg">
      <Tippy
        disabled={!item.notEditable || notEditableItemsHoverText === undefined}
        content={notEditableItemsHoverText}
        placement="bottom"
      >
        <ItemKeyField sm={6} className="flex-grow flex">
          <EditorSmallInput
            monaco={monaco}
            languageId={languageId}
            value={key}
            readOnly={item.notEditable}
            onChange={handleKeyChange}
            placeholder={`Parameter ${index + 1}`}
          />
        </ItemKeyField>
      </Tippy>
      <Tippy
        disabled={!item.notEditable || notEditableItemsHoverText === undefined}
        content={notEditableItemsHoverText}
        placement="bottom"
      >
        <ItemKeyField sm={6} className="flex-grow flex">
          <EditorSmallInput
            monaco={monaco}
            languageId={languageId}
            placeholder={`Value ${index + 1}`}
            value={value}
            readOnly={item.notEditable}
            onChange={handleValueChange}
          />
        </ItemKeyField>
      </Tippy>
      <div className="px-1 flex justify-center align-center">
        <Tippy content={"Delete"}>
          <Button
            disabled={item.notEditable}
            className="p-0"
            size="sm"
            variant="ghost"
            onClick={handleDeleteClick}
          >
            <AiOutlineDelete size={18} color="#fe5353" />
          </Button>
        </Tippy>
      </div>
    </div>
  );
};

export { EditableTableItem };
