var React = require('react')

var updateVolunteer = require('../../actions').updateVolunteer

var ProfileSettings = React.createClass({

  getInitialState: function () {
    return {
      canSubmit: false
    }
  },

  enableButton: function () {
    this.setState({
      canSubmit: true
    })
  },

  disableButton: function () {
    this.setState({
      canSubmit: false
    })
  },

  handleSubmit: function(data) {
    data.id = this.props.profileId
    this.props.context.executeAction(updateVolunteer, data)
  },

  render: function() {
    return (
      <Formsy.Form className="settingsForm" onSubmit={this.handleSubmit} onValid={this.enableButton} onInvalid={this.disableButton}>

        <h1>
          Informacje publiczne
        </h1>

        <div className="alert">
          <p>
            Informacja o tym gdzie będą się te dane wyświetlać. I dlaczego warto uzupełnić.
          </p>
        </div>

        {this.props.children}

        <div className="pure-g">
          <div className="pure-u-1 pure-u-md-1-3"></div>
          <div className="pure-u-1 pure-u-md-2-3">
            <button type="submit" className="button" disabled={!this.state.canSubmit}>
              Zmień
            </button>
            <div id="button-clear"></div>
          </div>
        </div>
      </Formsy.Form>
    )
  }
})

module.exports = ProfileSettings

        //<Snackbar
          //open={!!this.props.success}
          //message="Zapisano"
          //autoHideDuration={5000}
          //onRequestClose={this.props.handleSuccessSnackbarClose} />
        //<Snackbar
          //open={!!this.props.error}
          //message="Wystąpił błąd"
          //autoHideDuration={5000}
          //onRequestClose={this.props.handleErrorSnackbarClose} />
