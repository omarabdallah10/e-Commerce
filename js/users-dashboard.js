/**
 * Page User List
 */
import {fetchAndStoreJson} from "./dumpJson.js"
'use strict';

import AuthModule from './Authentication/AuthModule.js';

AuthModule.isAdmin();

const userjsonFileURL ='assets/json/user-list.json';
fetchAndStoreJson(userjsonFileURL,'users');
// Datatable (jquery)
$(function () {
  var isUniqueEmail = function () {
    var selectedRow = $('.datatables-users tbody .selected');
    var rowIndex = dt_user.row(selectedRow).index();
    var email = $("#edit-user-email").val();
    var isUnique = true;
  
    dt_user.rows().every(function (rowIdx, tableLoop, rowLoop) {
      if (rowIdx !== rowIndex) {
        var rowData = this.data();
        if (rowData.email === email) {
          isUnique = false;
          return false;
        }
      }
    });
  
    if (!isUnique) {
      alert("Email already exists");
    }
    return isUnique;
  };
  
  let borderColor, bodyBg, headingColor;

  if (isDarkStyle) {
    borderColor = config.colors_dark.borderColor;
    bodyBg = config.colors_dark.bodyBg;
    headingColor = config.colors_dark.headingColor;
  } else {
    borderColor = config.colors.borderColor;
    bodyBg = config.colors.bodyBg;
    headingColor = config.colors.headingColor;
  }

  // Variable declaration for table
  var dt_user_table = $('.datatables-users'),
    select2 = $('.select2'),
    userView = 'app-user-view-account.html',
    statusObj = {
      1: { title: 'Inactive', class: 'bg-label-secondary' },
      2: { title: 'Active', class: 'bg-label-success' },
      // 3: { title: 'Pending', class: 'bg-label-warning' }
    };

  if (select2.length) {
    var $this = select2;
    $this.wrap('<div class="position-relative"></div>').select2({
      placeholder: 'Select Country',
      dropdownParent: $this.parent()
    });
  }
  var userData = Object.values(JSON.parse(localStorage.getItem('users'))) || [];

  // Users datatable
  if (dt_user_table.length) {
    var dt_user = dt_user_table.DataTable({
      // ajax: assetsPath + 'json/user-list.json', // JSON file to add data
      data: userData, // Use local data instead of Ajax
      columns: [
        
        { data: '' },
        { data:'id'},
        { data: 'full_name' },
        { data: 'email'},
        { data: 'role' },
        { data: 'status' },
        { data: 'action' },
      ],
      columnDefs: [
        {
          // For Responsive
          className: 'control',
          searchable: false,
          orderable: false,
          responsivePriority: 2,
          targets: 0,
          render: function (data, type, full, meta) {
            return '';
          }
        },
        {
          targets: 1,
          responsivePriority: 3,
          render: function (data, type, full, meta) {
            return '<div class="d-flex flex-column id">' +
              '<span class="fw-bold text-truncate">' +
              full['id'] +
              '</span>' +
              '</div>';
          }
        },
        {
          targets: 2,
          responsivePriority: 3,
          render: function (data, type, full, meta) {
            return '<div class="d-flex flex-column id">' +
              '<span class="fw-bold text-truncate">' +
              full['full_name'] +
              '</span>' +
              '</div>';
          }
        },
        {
          targets: 3,
          responsivePriority: 3,
          render: function (data, type, full, meta) {
            return '<div class="d-flex flex-column id">' +
              '<span class="fw-bold text-truncate">' +
              full['email'] +
              '</span>' +
              '</div>';
          }
        },
        {
          // User Role Manipulation
          targets: 4,
          render: function (data, type, full, meta) {
            var $role = full['role'];
            var roleBadgeObj = {
              Customer:
              '<span class="badge badge-center rounded-pill bg-label-warning w-px-30 h-px-30 me-2"><i class="bx bx-user bx-xs"></i></span>',
              Seller:
              '<span class="badge badge-center rounded-pill bg-label-info w-px-30 h-px-30 me-2"><i class="bx bx-edit bx-xs"></i></span>',
              Admin:
              '<span class="badge badge-center rounded-pill bg-label-secondary w-px-30 h-px-30 me-2"><i class="bx bx-mobile-alt bx-xs"></i></span>'
            };
            return "<span class='text-truncate d-flex align-items-center'>" + roleBadgeObj[$role] + $role + '</span>';
          }
        },
        // {
        //   // Plans
        //   targets: 3,
        //   render: function (data, type, full, meta) {
        //     var $plan = full['current_plan'];

        //     return '<span class="fw-medium">' + $plan + '</span>';
        //   }
        // },
        {
          // User Status Mainuplation
          targets: 5,
          render: function (data, type, full, meta) {
            var $status = full['status'];
            return '<span class="badge ' + statusObj[$status].class + '">' + statusObj[$status].title + '</span>';
          }
        },
        {
          // Actions
          targets: 6,
          title: 'Actions',
          searchable: false,
          orderable: false,
          render: function (data, type, full, meta) {
            return (
              '<div class="d-inline-block text-nowrap">' +
              '<button class="btn btn-sm btn-icon edit-record"><i class="bx bx-edit"></i></button>' +
              '<button class="btn btn-sm btn-icon delete-record"><i class="bx bx-trash"></i></button>' +
              // '<button class="btn btn-sm btn-icon dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i class="bx bx-dots-vertical-rounded me-2"></i></button>' +
              // '<div class="dropdown-menu dropdown-menu-end m-0">' +
              // '<a href="' +
              // userView +
              // '" class="dropdown-item">View</a>' +
              // '<a href="javascript:;" class="dropdown-item">Suspend</a>' +
              // '</div>' +
              '</div>'
            );
          }
        }
      ],
      order: [[1, 'asc']],
      dom:
        '<"row mx-2"' +
        '<"col-md-2"<"me-3"l>>' +
        '<"col-md-10"<"dt-action-buttons text-xl-end text-lg-start text-md-end text-start d-flex align-items-center justify-content-end flex-md-row flex-column mb-3 mb-md-0"fB>>' +
        '>t' +
        '<"row mx-2"' +
        '<"col-sm-12 col-md-6"i>' +
        '<"col-sm-12 col-md-6"p>' +
        '>',
      language: {
        sLengthMenu: '_MENU_',
        search: '',
        searchPlaceholder: 'Search..'
      },
      // Buttons with Dropdown
      buttons: [
        {
          extend: 'collection',
          className: 'btn btn-label-secondary dropdown-toggle mx-3',
          text: '<i class="bx bx-export me-1"></i>Export',
          buttons: [
            {
              extend: 'print',
              text: '<i class="bx bx-printer me-2" ></i>Print',
              className: 'dropdown-item',
              exportOptions: {
                columns: [1, 2, 3,4],
                // prevent avatar to be print
                format: {
                  body: function (inner, coldex, rowdex) {
                    if (inner.length <= 0) return inner;
                    var el = $.parseHTML(inner);
                    var result = '';
                    $.each(el, function (index, item) {
                      if (item.classList !== undefined && item.classList.contains('id')) {
                        result = result + item.lastChild.firstChild.textContent;
                      } else if (item.innerText === undefined) {
                        result = result + item.textContent;
                      } else result = result + item.innerText;
                    });
                    return result;
                  }
                }
              },
              customize: function (win) {
                //customize print view for dark
                $(win.document.body)
                  .css('color', headingColor)
                  .css('border-color', borderColor)
                  .css('background-color', bodyBg);
                $(win.document.body)
                  .find('table')
                  .addClass('compact')
                  .css('color', 'inherit')
                  .css('border-color', 'inherit')
                  .css('background-color', 'inherit');
              }
            },
            {
              extend: 'csv',
              text: '<i class="bx bx-file me-2" ></i>Csv',
              className: 'dropdown-item',
              exportOptions: {
                columns: [1, 2, 3,4,5],
                // prevent avatar to be display
                format: {
                  body: function (inner, coldex, rowdex) {
                    if (inner.length <= 0) return inner;
                    var el = $.parseHTML(inner);
                    var result = '';
                    $.each(el, function (index, item) {
                      if (item.classList !== undefined && item.classList.contains('id')) {
                        result = result + item.lastChild.firstChild.textContent;
                      } else if (item.innerText === undefined) {
                        result = result + item.textContent;
                      } else result = result + item.innerText;
                    });
                    return result;
                  }
                }
              }
            },
            {
              extend: 'excel',
              text: '<i class="bx bxs-file-export me-2"></i>Excel',
              className: 'dropdown-item',
              exportOptions: {
                columns: [1, 2, 3,4,5],
                // prevent avatar to be display
                format: {
                  body: function (inner, coldex, rowdex) {
                    if (inner.length <= 0) return inner;
                    var el = $.parseHTML(inner);
                    var result = '';
                    $.each(el, function (index, item) {
                      if (item.classList !== undefined && item.classList.contains('id')) {
                        result = result + item.lastChild.firstChild.textContent;
                      } else if (item.innerText === undefined) {
                        result = result + item.textContent;
                      } else result = result + item.innerText;
                    });
                    return result;
                  }
                }
              }
            },
            {
              extend: 'pdf',
              text: '<i class="bx bxs-file-pdf me-2"></i>Pdf',
              className: 'dropdown-item',
              exportOptions: {
                columns: [1, 2, 3,4,5],
                // prevent avatar to be display
                format: {
                  body: function (inner, coldex, rowdex) {
                    if (inner.length <= 0) return inner;
                    var el = $.parseHTML(inner);
                    var result = '';
                    $.each(el, function (index, item) {
                      if (item.classList !== undefined && item.classList.contains('id')) {
                        result = result + item.lastChild.firstChild.textContent;
                      } else if (item.innerText === undefined) {
                        result = result + item.textContent;
                      } else result = result + item.innerText;
                    });
                    return result;
                  }
                }
              }
            },
            {
              extend: 'copy',
              text: '<i class="bx bx-copy me-2" ></i>Copy',
              className: 'dropdown-item',
              exportOptions: {
                columns: [1, 2, 3,4,5],
                // prevent avatar to be display
                format: {
                  body: function (inner, coldex, rowdex) {
                    if (inner.length <= 0) return inner;
                    var el = $.parseHTML(inner);
                    var result = '';
                    $.each(el, function (index, item) {
                      if (item.classList !== undefined && item.classList.contains('id')) {
                        result = result + item.lastChild.firstChild.textContent;
                      } else if (item.innerText === undefined) {
                        result = result + item.textContent;
                      } else result = result + item.innerText;
                    });
                    return result;
                  }
                }
              }
            }
          ]
        },
        {
          text: '<i class="bx bx-plus me-0 me-sm-1"></i><span class="d-none d-sm-inline-block">Add New User</span>',
          className: 'add-new btn btn-primary',
          attr: {
            'data-bs-toggle': 'offcanvas',
            'data-bs-target': '#offcanvasAddUser'
          }
        }
        // ,
        // {
        //   text: '<i class="bx bx-plus me-0 me-sm-1"></i><span class="d-none d-sm-inline-block">Edit User</span>',
        //   className: 'add-new btn btn-primary',
        //   attr: {
        //     'data-bs-toggle': 'offcanvas',
        //     'data-bs-target': '#offcanvasEditUser'
        //   }
        // }
      ],
      // For responsive popup
      responsive: {
        details: {
          display: $.fn.dataTable.Responsive.display.modal({
            header: function (row) {
              var data = row.data();
              return 'Details of ' + data['full_name'];
            }
          }),
          type: 'column',
          renderer: function (api, rowIdx, columns) {
            var data = $.map(columns, function (col, i) {
              return col.title !== '' // ? Do not show row in modal popup if title is blank (for check box)
                ? '<tr data-dt-row="' +
                    col.rowIndex +
                    '" data-dt-column="' +
                    col.columnIndex +
                    '">' +
                    '<td>' +
                    col.title +
                    ':' +
                    '</td> ' +
                    '<td>' +
                    col.data +
                    '</td>' +
                    '</tr>'
                : '';
            }).join('');

            return data ? $('<table class="table"/><tbody />').append(data) : false;
          }
        }
      },
      initComplete: function () {
        // Adding role filter once table initialized
        this.api()
          .columns(4)
          .every(function () {
            var column = this;
            var select = $(
              '<select id="UserRole" class="form-select text-capitalize"><option value=""> Select Role </option></select>'
            )
              .appendTo('.user_role')
              .on('change', function () {
                var val = $.fn.dataTable.util.escapeRegex($(this).val());
                column.search(val ? '^' + val + '$' : '', true, false).draw();
              });

            column
              .data()
              .unique()
              .sort()
              .each(function (d, j) {
                select.append('<option value="' + d + '">' + d + '</option>');
              });
          });
        // Adding plan filter once table initialized
        // this.api()
        //   .columns(3)
        //   .every(function () {
        //     var column = this;
        //     var select = $(
        //       '<select id="UserPlan" class="form-select text-capitalize"><option value=""> Select Plan </option></select>'
        //     )
        //       .appendTo('.user_plan')
        //       .on('change', function () {
        //         var val = $.fn.dataTable.util.escapeRegex($(this).val());
        //         column.search(val ? '^' + val + '$' : '', true, false).draw();
        //       });


        //     column
        //       .data()
        //       .unique()
        //       .sort()
        //       .each(function (d, j) {
        //         select.append('<option value="' + d + '">' + d + '</option>');
        //       });
        //   });
        // Adding status filter once table initialized
        this.api()
          .columns(5)
          .every(function () {
            var column = this;
            var select = $(
              '<select id="FilterTransaction" class="form-select text-capitalize"><option value=""> Select Status </option></select>'
            )
              .appendTo('.user_status')
              .on('change', function () {
                var val = $.fn.dataTable.util.escapeRegex($(this).val());
                column.search(val ? '^' + val + '$' : '', true, false).draw();
              });

            column
              .data()
              .unique()
              .sort()
              .each(function (d, j) {
                select.append(
                  '<option value="' +
                    statusObj[d].title +
                    '" class="text-capitalize">' +
                    statusObj[d].title +
                    '</option>'
                );
              });
          });
      }
    });
    // To remove default btn-secondary in export buttons
    $('.dt-buttons > .btn-group > button').removeClass('btn-secondary');
  }

  // Delete Record
  $('.datatables-users tbody').on('click', '.delete-record', function () {
    dt_user.row($(this).parents('tr')).remove().draw();
    localStorage.setItem('users', JSON.stringify(dt_user.data().toArray()));
  });
  
  $('.datatables-users tbody').on('click', '.edit-record', function () {
    // Get row data

    // Get all emails from the DataTable
  var allEmails =dt_user.data().toArray().map(user => user.email);
  //console.log(allEmails);
// Now, allEmails is an array containing all email addresses
//console.log('All Emails:', allEmails);
    var row_data = dt_user.row($(this).parents('tr')).data();
    // Set data to the edit modal inputs
    $("#edit-user-fullname").val(row_data.full_name);
    $("#edit-user-email").val(row_data.email);
    console.log(row_data.role);
    $("#edit-user-role").val(row_data.role);
    $("#edit-user-status").val(row_data.status);
    // Show the edit modal
    $("#offcanvasEditUser").offcanvas('show');
  }
  );


  //#Add Row
  function addRow(){
    // Add values to the OffCanvas from the table
    var maxId = 0;
  dt_user.data().each(function (row) {
    if (row.id > maxId) {
      maxId = row.id;
    }
  });

    
    dt_user.row.add({
      id:maxId+1,
      full_name: $("#add-user-fullname").val(),
      role:  $("#user-role option:selected").text(),
      email: $("#add-user-email").val(),
      password: $("#add-user-password").val(),
      status: Number($('#user-status').val()) // You can customize this as needed
    }).draw();
  }

  function editRow(rowIndex){
    // Add values to the OffCanvas from the table
    var selectedRow = $('.datatables-users tbody .selected');
    var rowIndex = dt_user.row(selectedRow).index();
    dt_user.row(rowIndex).data({
      id:dt_user.row(rowIndex).data().id,
      password: $("#edit-user-password").val(),
      full_name: $("#edit-user-fullname").val(),
      role:  $("#edit-user-role option:selected").text(),
      // username: $("#add-user-email").val(), // Use the email as the username for demonstration purposes
      email: $("#edit-user-email").val(),
      // current_plan: $("#user-role option:selected").text(),
      // billing: "Manual - Cash", // You can customize this as needed
      status: Number($('#edit-user-status').val()), // You can customize this as needed
      // avatar: dt_user.row(rowIndex).data().avatar
    }).draw();
    
  }
  // Filter form control to default size
  // ? setTimeout used for multilingual table initialization
  setTimeout(() => {
    $('.dataTables_filter .form-control').removeClass('form-control-sm');
    $('.dataTables_length .form-select').removeClass('form-select-sm');
  }, 300);

  (function () {
    const phoneMaskList = document.querySelectorAll('.phone-mask'),
      addNewUserForm = document.getElementById('addNewUserForm');
  
    // Phone Number
    if (phoneMaskList) {
      phoneMaskList.forEach(function (phoneMask) {
        new Cleave(phoneMask, {
          phone: true,
          phoneRegionCode: 'US'
        });
      });
    }
    // Add New User Form Validation
    const fv = FormValidation.formValidation(addNewUserForm, {
      fields: {
        userFullname: {
          validators: {
            notEmpty: {
              message: 'Please enter fullname '
            }
          }
        },
        userEmail: {
          validators: {
            notEmpty: {
              message: 'Please enter your email'
            },
            emailAddress: {
              message: 'The value is not a valid email address'
            },
            callback: {
              callback: function (input) {
                // console.log(input.value);
                var allEmails =dt_user.data().toArray().map(user => user.email);
                const emailExists = allEmails.some(email => email.toLowerCase() === input.value.toLowerCase());
                if (emailExists) {
                  return {
                    valid: false,
                    message: 'The email already exists'
                  };
                }
                else {
                  return {
                    valid: true,
                    message: 'The email is valid'
                  };
                }
              }
            }
          }
        },
        userPassword: {
          validators: {
            notEmpty: {
              message: 'Please enter your password'
            },
          regexp: {
          regexp: /^.{8,}$/,
          message: 'Password must be at least 8 characters long'
        }
          }
        },
      },

      plugins: {
        trigger: new FormValidation.plugins.Trigger(),
        bootstrap5: new FormValidation.plugins.Bootstrap5({
          // Use this for enabling/changing valid/invalid class
          eleValidClass: '',
          rowSelector: function (field, ele) {
            // field is the field name & ele is the field element
            return '.mb-3';
          }
        }),
        submitButton: new FormValidation.plugins.SubmitButton(),
        // Submit the form when all fields are valid
        // defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
        autoFocus: new FormValidation.plugins.AutoFocus()
      }
    });
    const fv2 = FormValidation.formValidation(editUserForm, {
      fields: {
        userFullname: {
          validators: {
            notEmpty: {
              message: 'Please enter fullname '
            }
          }
        },
        userEmail: {
          validators: {
            notEmpty: {
              message: 'Please enter your email'
            },
            emailAddress: {
              message: 'The value is not a valid email address'
            }
          }
        },
        userPassword: {
          validators: {
            notEmpty: {
              message: 'Please enter your password'
            },
          regexp: {
          regexp: /^.{8,}$/,
          message: 'Password must be at least 8 characters long'
        }


          }
        },
      },
      plugins: {
        trigger: new FormValidation.plugins.Trigger(),
        bootstrap5: new FormValidation.plugins.Bootstrap5({
          // Use this for enabling/changing valid/invalid class
          eleValidClass: '',
          rowSelector: function (field, ele) {
            // field is the field name & ele is the field element
            return '.mb-3';
          }
        }),
        submitButton: new FormValidation.plugins.SubmitButton(),
        // Submit the form when all fields are valid
        // defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
        autoFocus: new FormValidation.plugins.AutoFocus()
      }
    });
  
    // Add Record
    $('#offcanvasAddUser .btn-primary').on('click', function () {
      // Trigger the validation
      fv.validate().then(function (status) {
        if (status === 'Valid') {
          // If the form is valid, proceed with adding the user
          
          addRow();
          localStorage.setItem('users', JSON.stringify(dt_user.data().toArray()));

          // Reset the form
          addNewUserForm.reset();
  
          // Close the offcanvas
          $("#offcanvasAddUser").offcanvas('hide');
        }
      });
    });
    // Make A row Selected
    $('.datatables-users tbody').on('click', 'tr', function () {
      // Remove the 'selected' class from all other rows
      $('.datatables-users tbody tr').removeClass('selected');
    
      // Add the 'selected' class to the clicked row
      $(this).addClass('selected');
    });
    
    $('#offcanvasEditUser .btn-primary').on('click', function () {
      var selectedRow = $('.datatables-users tbody .selected');

      var rowIndex = dt_user.row(selectedRow).index();

      // Set data to the edit modal inputs
      // Update values in the DataTable
      // dt_user.cell(rowIndex, 1).data("Ahmed");
      // dt_user.cell(rowIndex, 2).data("Admin"); // Use the selected value, not the text
      // dt_user.cell(rowIndex, 3).data(3);
      // Trigger the validation
      fv2.validate().then(function (status) {
        if ((status === 'Valid' )  && isUniqueEmail()) {
          // If the form is valid, proceed with adding the user
          // alert("ok2");
          editRow();
          localStorage.setItem('users', JSON.stringify(dt_user.data().toArray()));
          // Reset the form
          addNewUserForm.reset();
  
          // Close the offcanvas
          $("#offcanvasEditUser").offcanvas('hide');
        }
      });
      
    });
    
  })();


});
