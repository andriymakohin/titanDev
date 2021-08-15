import React, {useEffect } from 'react';
import InformItemByPresent from './InformItemByPresent';
import style from './informListByPresent.module.css';
import trStyle from './trStyle.module.css';
import { connect } from 'react-redux';
import presentSelector from '../../redux/selectors/presentSelector';
import operationPresent from '../../redux/operations/presentOperation';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import PersoneSelectors from '../../redux/selectors/PersoneSelectors';

const InformationListByPresent = ({
  presents,
  getPresents,
  deletePresent,
  buyPresent,
  persone,
}) => {
  useEffect(() => {
    getPresents();
  }, []);

  const findPersone = (personeId) => {
    const person = persone.filter((person) => person._id === personeId);
    console.log(person)
    return person[0];
  };
  return (
    <div className={style.presentItem_container}>
      {presents && (
        <TransitionGroup component="ul" className={style.presentItem_persones}>
          {presents.map((present) => {
            const person = findPersone(present.personeId);
            return (
              <CSSTransition
                in={true}
                classNames={trStyle}
                key={present._id}
                timeout={250}
                unmountOnExit
              >
                {
                  <li className={style.presentItem_item} key={present._id}>
                    <InformItemByPresent
                      idPresent={present._id}
                      personeId={present.personeId}
                      reward={present.reward}
                      title={
                        present.title.length > 13
                          ? `${present.title.slice(0, 13)}...`
                          : present.title
                      }
                      image={present.image}
                      deletePresent={deletePresent}
                      buyPresent={buyPresent}
                      person={person ? person : ''}
                    />
                  </li>
                }
              </CSSTransition>
            );
          })}
        </TransitionGroup>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  persone: PersoneSelectors.getPersones(state),
  presents: presentSelector.getPresents(state),
});

const mapDispatchToProps = {
  getPresents: operationPresent.getAllPresents,
  deletePresent: operationPresent.removePresent,
  buyPresent: operationPresent.buyPresentById,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InformationListByPresent);
