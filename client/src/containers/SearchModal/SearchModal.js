import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import ModalCloseBtn from "../../layout/ModalCloseBtn/ModalCloseBtn";
import ModalSearch from "../../components/modalSearch/ModalSearch";
import "./SearchModal.scss";

const SearchModal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  let history = useHistory();

  useEffect(() => {
    setModalOpen(true);
  }, [modalOpen]);

  let back = e => {
    e.stopPropagation();
    history.goBack();
  };

  return (
    <div className="overlayContainer">
      <ModalCloseBtn close={back} />
      <div className={modalOpen ? "modalSearchFloat" : ""}>
        <ModalSearch close={back} />
      </div>
    </div>
  );
};

export default SearchModal;
