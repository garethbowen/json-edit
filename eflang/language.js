var eflang = (function () {
    'use strict';

    Blockly.LANG_VARIABLES_GET_FIELD_INPUT_FIELD = "get field";
    Blockly.LANG_VARIABLES_GET_FIELD_INPUT_IN = 'in object';
    Blockly.LANG_VARIABLES_GET_FIELD_INPUT_FROM_TOOLTIP_1 = 'Returns the value of field in an object.';
    // Out Variables Blocks.
    Blockly.LANG_VARIABLES_OUTGET_HELPURL = 'http://en.wikipedia.org/wiki/Variable_(computer_science)';
    Blockly.LANG_VARIABLES_OUTGET_TITLE_1 = 'get out var';
    Blockly.LANG_VARIABLES_OUTGET_ITEM = 'item';
    Blockly.LANG_VARIABLES_OUTGET_TOOLTIP_1 = 'Returns the value of this output variable.';

    Blockly.LANG_VARIABLES_OUTSET_HELPURL = 'http://en.wikipedia.org/wiki/Variable_(computer_science)';
    Blockly.LANG_VARIABLES_OUTSET_TITLE_1 = 'set out var';
    Blockly.LANG_VARIABLES_OUTSET_ITEM = 'item';
    Blockly.LANG_VARIABLES_OUTSET_TOOLTIP_1 = 'Sets this output variable to be equal to the input.';


    Blockly.LANG_CATEGORY_OBJS = "Objects";
    Blockly.LANG_CATEGORY_PROCS = "Procedures";

    Blockly.LANG_PROCS_CALL_NAME = 'procedureName';
    Blockly.LANG_PROCS_CALL_WITH_INPUT_WITH = 'with';
    Blockly.LANG_PROCS_CALL_WITH_TOOLTIP_1 = 'Call a procedure with any number of arguments.';

    Blockly.LANG_PROCS_CALL_WITH_CONTAINER_TITLE_ADD = 'procedure';
    Blockly.LANG_PROCS_CALL_WITH_CONTAINER_TOOLTIP_1 = 'Add, remove, or reorder sections to reconfigure this procedure call.';

    Blockly.LANG_PROCS_CALL_WITH_NAME = 'Call';
    Blockly.LANG_PROCS_CALL_WITH_ITEM_TITLE = 'argument';
    Blockly.LANG_PROCS_CALL_WITH_ITEM_TOOLTIP_1 = 'Add an argument to the argument list.';

    Blockly.Language.variables_getField = {
      // Get field from object
      category: Blockly.LANG_CATEGORY_OBJS,
      helpUrl: "",
      init: function() {
        this.setColour(330);
        this.setOutput(true, null);
        this.appendValueInput('AT')
            .setCheck(String)
            .appendTitle(Blockly.LANG_VARIABLES_GET_FIELD_INPUT_FIELD);
        this.appendValueInput('VALUE')
            .appendTitle(Blockly.LANG_VARIABLES_GET_FIELD_INPUT_IN);
        this.setInputsInline(true);
        this.setTooltip(Blockly.LANG_VARIABLES_GET_FIELD_INPUT_FROM_TOOLTIP_1);
      }
    };

    Blockly.JavaScript.variables_getField = function() {
      // Get letter at index.
      var argument0 = Blockly.JavaScript.valueToCode(this, 'AT',
          Blockly.JavaScript.ORDER_NONE) || 'value';
      var argument1 = Blockly.JavaScript.valueToCode(this, 'VALUE',
          Blockly.JavaScript.ORDER_MEMBER) || '\'\'';

      var code = argument1 + '.' + argument0.slice(1, -1);
      return [code, Blockly.JavaScript.ORDER_MEMBER];
    };

    Blockly.Language.variables_outget = {
      // Variable getter.
      category: "Output",
      helpUrl: Blockly.LANG_VARIABLES_GET_HELPURL,
      init: function() {
        this.setColour(330);
        this.appendDummyInput()
            .appendTitle(Blockly.LANG_VARIABLES_OUTGET_TITLE_1)
            .appendTitle(new Blockly.FieldVariable(
            Blockly.LANG_VARIABLES_GET_ITEM), 'VAR');
        this.setOutput(true, null);
        this.setTooltip(Blockly.LANG_VARIABLES_OUTGET_TOOLTIP_1);
      },
      getVars: function() {
        return [this.getTitleValue('VAR')];
      },
      renameVar: function(oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getTitleValue('VAR'))) {
          this.setTitleValue(newName, 'VAR');
        }
      }
    };

    Blockly.Language.variables_outset = {
      // Variable setter.
      category: "Output",
      helpUrl: Blockly.LANG_VARIABLES_OUTSET_HELPURL,
      init: function() {
        this.setColour(330);
        this.appendValueInput('VALUE')
            .appendTitle(Blockly.LANG_VARIABLES_OUTSET_TITLE_1)
            .appendTitle(new Blockly.FieldVariable(
            Blockly.LANG_VARIABLES_OUTSET_ITEM), 'VAR');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.LANG_VARIABLES_OUTSET_TOOLTIP_1);
      },
      getVars: function() {
        return [this.getTitleValue('VAR')];
      },
      renameVar: function(oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getTitleValue('VAR'))) {
          this.setTitleValue(newName, 'VAR');
        }
      }
    };

    Blockly.JavaScript.procs_call_with = function() {
      // Create a list with any number of elements of any type.
      var
        strname = Blockly.JavaScript.valueToCode(this, 'NAME',
                                      Blockly.JavaScript.ORDER_COMMA) || "proc",
        name = strname.slice(1, -1),
        code = new Array(this.itemCount_);

      for (var n = 0; n < this.itemCount_; n++) {
        code[n] = Blockly.JavaScript.valueToCode(this, 'ADD' + n,
            Blockly.JavaScript.ORDER_COMMA) || 'null';
      }
      code = name + '(' + code.join(', ') + ')';
      return [code, Blockly.JavaScript.ORDER_ATOMIC];
    };

    Blockly.Language.procs_call_with = {
      // Create a list with any number of elements of any type.
      category: Blockly.LANG_CATEGORY_PROCS,
      helpUrl: '',
      init: function() {
        this.setColour(290);
        this.appendDummyInput()
            .appendTitle(Blockly.LANG_PROCS_CALL_WITH_NAME)
            .appendTitle(new Blockly.FieldVariable(
            Blockly.LANG_PROCS_CALL_NAME), 'NAME');
        this.appendValueInput('ADD0')
            .appendTitle(Blockly.LANG_PROCS_CALL_WITH_INPUT_WITH);
        this.appendValueInput('ADD1');
        this.setOutput(true, null);
        this.setMutator(new Blockly.Mutator(['procs_call_with_item']));
        this.setTooltip(Blockly.LANG_PROCS_CALL_WITH_TOOLTIP_1);
        this.itemCount_ = 2;
      },
      mutationToDom: function(workspace) {
        var container = document.createElement('mutation');
        container.setAttribute('items', this.itemCount_);
        return container;
      },
      domToMutation: function(container) {
        for (var x = 0; x < this.itemCount_; x++) {
          this.removeInput('ADD' + x);
        }
        this.itemCount_ = window.parseInt(container.getAttribute('items'), 10);
        for (var x = 0; x < this.itemCount_; x++) {
          var input = this.appendValueInput('ADD' + x);
          if (x == 0) {
            input.appendTitle(Blockly.LANG_PROCS_CALL_WITH_INPUT_WITH);
          }
        }
        if (this.itemCount_ == 0) {
          this.appendDummyInput('EMPTY')
              .appendTitle(Blockly.LANG_PROCS_CALL_EMPTY_TITLE_1);
        }
      },
      decompose: function(workspace) {
        var containerBlock = new Blockly.Block(workspace,
                                               'procs_call_with_container');
        containerBlock.initSvg();
        var connection = containerBlock.getInput('STACK').connection;
        for (var x = 0; x < this.itemCount_; x++) {
          var itemBlock = new Blockly.Block(workspace, 'procs_call_with_item');
          itemBlock.initSvg();
          connection.connect(itemBlock.previousConnection);
          connection = itemBlock.nextConnection;
        }
        return containerBlock;
      },
      compose: function(containerBlock) {
        // Disconnect all input blocks and remove all inputs.
        if (this.itemCount_ == 0) {
          this.removeInput('EMPTY');
        } else {
          for (var x = this.itemCount_ - 1; x >= 0; x--) {
            this.removeInput('ADD' + x);
          }
        }
        this.itemCount_ = 0;
        // Rebuild the block's inputs.
        var itemBlock = containerBlock.getInputTargetBlock('STACK');
        while (itemBlock) {
          var input = this.appendValueInput('ADD' + this.itemCount_);
          if (this.itemCount_ == 0) {
            input.appendTitle(Blockly.LANG_PROCS_CALL_WITH_INPUT_WITH);
          }
          // Reconnect any child blocks.
          if (itemBlock.valueConnection_) {
            input.connection.connect(itemBlock.valueConnection_);
          }
          this.itemCount_++;
          itemBlock = itemBlock.nextConnection &&
              itemBlock.nextConnection.targetBlock();
        }
        if (this.itemCount_ == 0) {
          this.appendDummyInput('EMPTY')
              .appendTitle(Blockly.LANG_PROCS_CALL_EMPTY_TITLE_1);
        }
      },
      saveConnections: function(containerBlock) {
        // Store a pointer to any connected child blocks.
        var itemBlock = containerBlock.getInputTargetBlock('STACK');
        var x = 0;
        while (itemBlock) {
          var input = this.getInput('ADD' + x);
          itemBlock.valueConnection_ = input && input.connection.targetConnection;
          x++;
          itemBlock = itemBlock.nextConnection &&
              itemBlock.nextConnection.targetBlock();
        }
      }
    };

    Blockly.Language.procs_call_with_container = {
      // Container.
      init: function() {
        this.setColour(290);
        this.appendDummyInput()
            .appendTitle(Blockly.LANG_PROCS_CALL_WITH_CONTAINER_TITLE_ADD);
        this.appendStatementInput('STACK');
        this.setTooltip(Blockly.LANG_PROCS_CALL_WITH_CONTAINER_TOOLTIP_1);
        this.contextMenu = false;
      }
    };

    Blockly.Language.procs_call_with_item = {
      // Add items.
      init: function() {
        this.setColour(290);
        this.appendDummyInput()
            .appendTitle(Blockly.LANG_PROCS_CALL_WITH_ITEM_TITLE);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.LANG_PROCS_CALL_WITH_ITEM_TOOLTIP_1);
        this.contextMenu = false;
      }
    };

    function parseQuery() {
        var i, parts, valparts, query = location.search.slice(1), result = {},
            key, value;

        parts = query.split("&");

        for (i = 0; i < parts.length; i += 1) {
            valparts = parts[i].split("=");

            if (valparts.length !== 2) {
                continue;
            }

            key = valparts[0].trim();
            value = valparts[1].trim();
            result[key] = value;
        }

        return result;
    }

    function init() {
      // Whitelist of blocks to keep.
      var
          query = parseQuery(),
          newLanguage = {},
          keepers = [
              'controls_if',
              'controls_if_if',
              'controls_if_elseif',
              'controls_if_else',

              'math_number',
              'math_arithmetic',
              'math_constrain',

              'lists_create_empty',
              'lists_create_with',
              'lists_create_with_item',
              'lists_create_with_container',
              'lists_length',
              'lists_isEmpty',
              'lists_indexOf',
              'lists_getIndex',
              'lists_setIndex',
              
              'logic_operation',
              'logic_compare',
              'logic_negate',
              'logic_boolean',

              'variables_get',
              'variables_set',

              'variables_outget',
              'variables_outset',

              'variables_getField',

              'text',
              'text_join',
              'text_create_join_container',
              'text_create_join_item',
              'text_append',
              'text_length',
              'text_isEmpty',
              'text_endString',
              'text_indexOf',
              'text_charAt',
              'text_changeCase',
              'text_trim',
              'text_print',

              'procs_call_with',
              'procs_call_with_item',
              'procs_call_with_container'
          ];

      for (var x = 0; x < keepers.length; x++) {
        newLanguage[keepers[x]] = Blockly.Language[keepers[x]];
      }
      // Fold control category into logic category.
      for (var name in newLanguage) {
        if (newLanguage[name].category == 'Control') {
          newLanguage[name].category = 'Logic';
        }
      }

      Blockly.Language = newLanguage;
      Blockly.inject(document.body, {path: './'});


      window.parent["init" + query.id](Blockly);
    }

    return {
        init: init,
        Blockly: Blockly
    }
}());
