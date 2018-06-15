const html = require("html-template-tag");
const layout = require("./layout");

module.exports = () => layout(html`
  <h3>Add a Page</h3>
  <hr>
  <form method="POST" action="/wiki/">

    <div>
      <label for="title" class="col-sm-2 control-label">Author Name</label>
      <input id="title" name='name' type="text" class="form-control"/>
    </div>

    <div>
      <label for="title" class="col-sm-2 control-label">Author Email</label>
      <input id="title" name='email' type="text" class="form-control"/>
    </div>

    <div class="form-group">
      <label for="title" class="col-sm-2 control-label">Page Title</label>
      <div class="col-sm-10">
        <input id="title" name='title' type="text" class="form-control"/>
      </div>
    </div>

    <div name='content'>
      <label for="title" class="col-sm-2 control-label">Content</label>
      <input id="title" name='content' type="text" class="form-control"/>
    </div>

    <div name='status'>
    <label for="title" class="col-sm-2 control-label">Status</label>
      <input id="title" name='status' type="text" class="form-control"/>
    </div>

    <div class="col-sm-offset-2 col-sm-10">
      <button type="submit" class="btn btn-primary">submit</button>
    </div>

  </form>
`);
