import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Card from './Card';
import mockData from '../mockData';

class PageContent extends React.Component {
  state = {
    searchBar: '',
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  render() {
    const { searchBar } = this.state;
    const { characters, loading, error } = this.props;

    const filteredCharacters = characters
      .filter((character) => (
        character.alias.toLowerCase().includes(searchBar.toLowerCase())
        || character.name.toLowerCase().includes(searchBar.toLowerCase())
      ));

    if (error) console.error(error);

    return (
      <div className="contentContainer">
        <section className="searchBarContainer">
          <input
            type="text"
            name="searchBar"
            id="searchBar"
            placeholder="Pesquise aqui"
            value={ searchBar }
            onChange={ this.handleChange }
          />
        </section>
        <section className="cardsContainer">
          {
            loading ? (
              <p>
                Carregando...
              </p>
            ) : (
              filteredCharacters.map((card) => <Card key={ card.id } card={ card } />)
            )
          }
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  characters: state.characterReducer.character,
  loading: state.characterReducer.loading,
  error: state.characterReducer.error,
});

PageContent.propTypes = {
  characters: PropTypes.arrayOf(PropTypes.shape({})),
  loading: PropTypes.bool,
  error: PropTypes.string,
};

PageContent.defaultProps = {
  characters: [...mockData],
  loading: false,
  error: '',
};

export default connect(mapStateToProps)(PageContent);
