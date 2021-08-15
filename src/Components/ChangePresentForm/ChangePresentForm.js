import React, { Component } from 'react';
import { connect } from 'react-redux';
import style from './ChangePresentForm.module.scss';
import closeBtn from '../../assets/images/close.svg';
import ballImg from '../../assets/images/changeStar.png';
import tringl from '../../assets/images/changeSelect.png';
import operation from '../../redux/operations/presentOperation';
import selectorPersone from '../../redux/selectors/PersoneSelectors';

class ChangeFormPresent extends Component {
  state = {
    title: '',
    reward: 0,
    personeId: '',
    persone: [],
    selectedFile: null,
  };

  componentDidMount() {
    this.setState({
      persone: this.props.persone,
      reward: this.props.reward,
      title: this.props.title,
      personeId: this.props.personeId,
    });
  }

  handleChangeName = (e) => {
    this.setState({ title: e.target.value });
  };
  handleChangeBall = (e) => {
    this.setState({ reward: e.target.value });
  };

  handleChosePersone = (e) => {
    console.log(e.target);
    this.setState({ personeId: e.target.value });
  };

  onSelectImageHandler = (e) => {
    this.setState({ selectedFile: e.target.files[0] });
  };
  handleCloseWindow = (e) => {
    this.props.onClose();
    this.setState({ title: '', reward: '', personeId: '', selectedFile: null });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { title, reward, personeId, selectedFile } = this.state;
    const { idPresent } = this.props;
    let fD;
    if (selectedFile) {
      fD = new FormData();
      fD.append('file', selectedFile);
      fD.set('title', title);
      fD.set('reward', reward);
      fD.set('personeId', personeId);
    } else {
      fD = { title, reward, personeId };
    }

    this.props.updatePresent(fD, idPresent);

    this.setState({ title: '', reward: '', personeId: '', selectedFile: null });
    this.props.onClose();
  };

  render() {
    const { persone, title, personeId, reward, 
      // selectedFile 
    } = this.state;
    const { removePresent, idPresent } = this.props;
    // const changeFileTitle = selectedFile
    //   ? `${selectedFile.name}`
    //   : 'Оберіть файл';
    return (
      <div className={style.container_presents}>
        <button
          className={style.container_presents__close}
          type="button"
          onClick={this.handleCloseWindow}
        >
          <img src={closeBtn} alt="close" />
        </button>

        <form className={style.present_form} onSubmit={this.handleSubmit}>
          <p className={style.present_form__title}>Редагування подарунку</p>

          <label className={style.present_form__label}>
            {' '}
            Назва
            <input
              className={style.present_form__input}
              placeholder="Введіть назву"
              value={title}
              onChange={this.handleChangeName}
            />
          </label>

          <label className={style.present_form__label}>
            Призначення подарунку
            <img
              src={tringl}
              className={style.present_form__change_persone}
              alt="tringle"
            />
            <div className={style.present_form__change_persone_block}></div>
            <select
              onChange={this.handleChosePersone}
              value={personeId}
              className={style.present_form__input}
            >
              {persone.map((persone) => (
                <option key={persone._id} value={persone._id}>
                  {persone.name}
                </option>
              ))}
            </select>
          </label>

          <label className={style.present_form__label}>
            Бал
            <img
              src={ballImg}
              className={style.present_form__ball_star}
              alt="star"
            />
            <input
              className={style.present_form__ball}
              id="grade"
              type="number"
              min="0"
              max="999"
              placeholder="00"
              onChange={this.handleChangeBall}
              value={reward}
            />
          </label>

          {/* <label className={style.present_form__label}>
            Завантажити фото (необов’язково)
            <div className={style.present_form__upload_box}>
              <input
                type="file"
                onChange={this.onSelectImageHandler}
                className={style.present_form__upload_box_input}
              />
              <p className={style.present_form__upload_box_text}>
                {changeFileTitle}
              </p>
              <span className={style.present_form__upload_box_btn}>
                {' '}
                Обрати{' '}
              </span>
            </div>
          </label> */}

          <label className={style.present_form__label}>
            <button
              className={style.present_form__delete_btn}
              onClick={() => removePresent(idPresent)} // передаем пропы id подарка для удаления
              type="button"
            >
              <svg
                className={style.present_form__delete_img}
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.66797 0.96582H9.34204V1.41577H10.3077V0.902832C10.3079 0.405029 9.90308 0 9.40552 0H6.60449C6.10693 0 5.70215 0.405029 5.70215 0.902832V1.41577H6.66797V0.96582Z"
                  fill="#BDBDBD"
                />
                <path
                  d="M12.5379 5.24219H3.47199C3.22358 5.24219 3.02802 5.4541 3.04804 5.70178L3.80598 15.0739C3.84821 15.597 4.28461 16 4.80891 16H11.2009C11.7252 16 12.1616 15.597 12.2038 15.0737L12.9617 5.70178C12.9819 5.4541 12.7863 5.24219 12.5379 5.24219ZM5.66718 15.0004C5.65705 15.001 5.64692 15.0013 5.63691 15.0013C5.38373 15.0013 5.17121 14.8042 5.15546 14.5481L4.68049 6.85413C4.66413 6.58789 4.86665 6.35876 5.13276 6.34241C5.39802 6.32629 5.62812 6.52832 5.64448 6.79468L6.11933 14.4886C6.13581 14.7549 5.9333 14.9839 5.66718 15.0004ZM8.49323 14.5184C8.49323 14.785 8.27705 15.0012 8.01032 15.0012C7.7436 15.0012 7.52741 14.785 7.52741 14.5184V6.82434C7.52741 6.55762 7.7436 6.34143 8.01032 6.34143C8.27692 6.34143 8.49323 6.55762 8.49323 6.82434V14.5184ZM11.3294 6.85278L10.8759 14.5468C10.8609 14.8033 10.648 15.0012 10.3944 15.0012C10.3848 15.0012 10.3752 15.001 10.3655 15.0005C10.0993 14.9847 9.89619 14.7562 9.91193 14.49L10.3653 6.7959C10.3809 6.52966 10.6087 6.32654 10.8757 6.34229C11.1419 6.35791 11.345 6.58655 11.3294 6.85278Z"
                  fill="#BDBDBD"
                />
                <path
                  d="M14.2077 3.75195L13.8906 2.80127C13.807 2.55066 13.5724 2.38159 13.3081 2.38159H2.70152C2.43736 2.38159 2.20262 2.55066 2.11912 2.80127L1.80199 3.75195C1.74083 3.9353 1.82042 4.12232 1.96898 4.21558C2.02952 4.25354 2.10118 4.27637 2.17992 4.27637H13.8298C13.9086 4.27637 13.9803 4.25354 14.0408 4.21545C14.1893 4.12219 14.2689 3.93518 14.2077 3.75195Z"
                  fill="#BDBDBD"
                />
              </svg>
              Видалити подарунок
            </button>
          </label>
          <div className={style.present_form__box_botton}>
            <button
              className={style.present_form__box_botton__canceling}
              type="button"
              onClick={this.handleCloseWindow}
            >
              {' '}
              Відмина{' '}
            </button>
            <button
              className={style.present_form__box_botton__save}
              type="submit"
            >
              {' '}
              Зберегти{' '}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStatetoProps = (state) => ({
  persone: selectorPersone.getPersones(state),
});

const mapDispatchToProps = {
  updatePresent: operation.updatePresent,
  removePresent: operation.removePresent,
};
export default connect(mapStatetoProps, mapDispatchToProps)(ChangeFormPresent);
// export default ChangeFormPresent;
