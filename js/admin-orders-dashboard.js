
'use strict';
import {fetchAndStoreJson} from "./dumpJson.js"

import AuthModule from './Authentication/AuthModule.js';

AuthModule.isAdmin();

const productjsonFileURL ='assets/json/order-list.json';
fetchAndStoreJson(productjsonFileURL,'orders');


// Datatable (jquery)
$(function () {
  var dt_user_table = $(".datatables-users"),
    select2 = $(".select2"),
    userView = "app-user-view-account.html",
    // #STATUS
    statusObj = {
      1: { title: "Delivering", class: "bg-label-info" },
      2: { title: "Delivered", class: "bg-label-success" },
      3: { title: "Canceled", class: "bg-label-danger" },
      // 4: { title: 'Canceled', class: 'bg-label-danger' },
    },
    //#Actions
    ActionObj = {
      1: `<div class="d-inline-block text-nowrap">
      <button class="btn btn-sm btn-icon success-record">  <i class="bx bx-check  text-success ">  </i></button>
      
      <button class="btn btn-sm btn-icon cancel-record">  <i class="bx bx-x  text-danger ">  </i></button>
      </div>`,
      2: "",
      3: "",
      // 4: { title: 'Canceled', class: 'bg-label-danger' },
    };
  // #SELECT2
  if (select2.length) {
    var $this = select2;
    $this.wrap('<div class="position-relative"></div>').select2({
      placeholder: 'Select Country',
      dropdownParent: $this.parent()
    });
  }
  //#DATA
  // var userData1 = JSON.parse(localStorage.getItem('orders2')) || [];
  // console.log(userData1);
  var userData = JSON.parse(localStorage.getItem('orders')) || [];
  const allOrdersArray = [];

  for (const userId in userData) {
      const userOrders = userData[userId];
  
      for (const orderId in userOrders) {
          const order = userOrders[orderId];
          order.userId = userId;
          allOrdersArray.push(order);
      }
  }
  console.log(allOrdersArray);
  // console.log(Object.values(userData["ID3"]));

  if (dt_user_table.length) {
      var dt_user = dt_user_table.DataTable({
      data: allOrdersArray, 
      
      columns: [
        { data: '' },
        { data: 'userId'},
        { data:'orderID'},
        { data: 'orderName' },
        { data:'sellerId'},
        {data:'orderDate'},
        { data: 'price' },
        { data: 'status' },
        {data:'actions'}
      ],
      // #MAPPING 
      columnDefs: [
        {
          //#Control_mapping
          className: 'control',
          searchable: false,
          orderable: false,
          responsivePriority:1,
          targets: 0,
          render: function (data, type, full, meta) {
            return '';
          }
        },
        {
          // #UserID_Mapping
          targets: 3,
          render: function (data, type, full, meta) {
            return '<div class="d-flex col-1 flex-row">' +
              '<span class="fw-bold ">' +
              full['userId'] +
              '</span>' +
              '</div>';
          }
        },
        {
          // #SellerID_Mapping
          targets: 4,
          render: function (data, type, full, meta) {
            return '<div class="d-flex col-1 flex-row id">' +
              '<span class="fw-bold">' +
              full['sellerId'] +
              '</span>' +
              '</div>';
          }
        },
        {
          // #OrderDate_Mapping
          targets: 5,
          render: function (data, type, full, meta) {
            return '<div class="d-flex col flex-row ">' +
              full['orderDate'] +
              '</div>';
          }
        },
        {
          // #OrderID_Mapping
          targets: 1,
          render: function (data, type, full, meta) {
            return '<div class="d-flex col-2 flex-column id">' +
              '<span class="fw-bold text-truncate">' +
              full['orderId'] +
              '</span>' +
              '</div>';
          }
        },
        
        {
          // #Name_Mapping
          targets:2,
          responsivePriority: 1,
          render: function (data, type, full, meta) {
            var $name = full['orderName'],
              $details = full['details'],
              $image = full['avatar'];
            if ($image) {
              var $output =
                '<img src="' + assetsPath + 'img/avatars/' + $image + '" alt="Avatar" class="rounded-circle">';
            } else {
              var stateNum = Math.floor(Math.random() * 6);
              var states = ['success', 'danger', 'warning', 'info', 'dark', 'primary', 'secondary'];
              var $state = states[stateNum],
                $name = full['orderName'],
                $initials = $name.match(/\b\w/g) || [];
              $initials = (($initials.shift() || '') + ($initials.pop() || '')).toUpperCase();
              $output = '<span class="avatar-initial rounded-circle bg-label-' + $state + '">' + $initials + '</span>';
            }
            // Creates full output for row
            var $row_output =
              '<div class="d-flex justify-content-start align-items-center user-name">' +
              // '<div class="avatar-wrapper">' +
              // '<div class="avatar avatar-sm me-3">' +
              // $output +
              // '</div>' +
              '</div>' +
              '<div class="d-flex flex-column">' +
              '<a href="' +
              userView +
              '" class="text-body text-truncate"><span class="fw-medium">' +
              $name +
              '</span></a>' +
              // '<small class="text-muted">' +
              // $details +
              // '</small>' +
              '</div>' +
              '</div>';
            return $row_output;
          }
        },
        {
          // #Price_Mapping
            targets:6 ,
            render: function (data, type, full, meta) {
            var $price = full['price'];
            var boxicon= `<span class="badge badge-center rounded-pill bg-label-secondary w-px-30 h-px-30 me-2"><i class='bx bx-dollar' ></i> </span>`;
            return "<span class='text-truncate d-flex align-items-center'>" +"$" + $price + '</span>';
          }
        },
        {
          // #Status_Mapping
          targets: 7,
          render: function (data, type, full, meta) {
            var $status = full['status'];

            return '<span class="badge ' + statusObj[$status].class + '">' + statusObj[$status].title + '</span>';
          }
        },
        {
          // Actions
          targets: -1,
          title: 'Actions',
          searchable: false,
          orderable: false,
          render: function (data, type, full, meta) {
            var $status = full['status'];
            return (
              ActionObj[$status]
            );
          }
        }
      ],
      //#Order_Default
      order: [[1, 'dec']],
      // #RESPONSIVE
      responsive: {
        details: {
          display: $.fn.dataTable.Responsive.display.modal({
            header: function (row) {
              var data = row.data();
              return 'Details of ' + data['orderName'];
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
        //#Add here
      },
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
                columns: [1, 2, 3,4,5,6,7],
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
                columns: [1, 2, 3,4,5,6,7],
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
                columns: [1, 2, 3,4,5,6,7],
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
                columns: [1, 2, 3,4,5,6,7],
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
                columns: [1, 2, 3,4,5,6,7],
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
        }
        //#Button_Add
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
      initComplete: function () {
        // Adding role filter once table initialized
        this.api()
          .columns(7)
          .every(function () {
            var column = this;
            var select = $(
              '<select id="orderStatus" class="form-select text-capitalize"><option value=""> Select Status </option></select>'
            )
              .appendTo('.order_status')
              .on('change', function () {
                var val = $.fn.dataTable.util.escapeRegex($(this).val());
                column.search(val ? '^' + val + '$' : '', true, false).draw();
              });

            column
              .data()
              .unique()
              .sort()
              .each(function (d, j) {
                select.append('<option value="' + statusObj[d].title + '">' + statusObj[d].title + '</option>');
              })
          });
        }
    });
  }
  function reverseToNestedStructure(allOrdersArray) {
    return allOrdersArray.reduce((result, order) => {
      const { userId, orderId, orderName, price, status, avatar, details, DeliveryDetails, sellerId, orderDate } = order;
  
      if (!result[userId]) {
        result[userId] = {};
      }
  
      result[userId][orderId] = {
        orderId,
        orderName,
        price,
        status,
        avatar,
        details,
        DeliveryDetails,
        sellerId,
        orderDate,
      };
  
      return result;
    }, {});
  }
  //#Events Listenrs
  $('.datatables-users tbody').on('click', '.cancel-record', function () {
  var clickedRow = dt_user.row($(this).closest('tr'));
  var rowIndex = clickedRow.index();

  // Change Td content of the row 
  dt_user.cell(rowIndex, 7).data(3);
  $(this).hide('fast');
  $(this).prev().hide('fast');

  localStorage.setItem('orders', JSON.stringify(reverseToNestedStructure(dt_user.data().toArray())));

  });
  $('.datatables-users tbody').on('click', '.success-record', function () {
    var clickedRow = dt_user.row($(this).closest('tr'));
    var rowIndex = clickedRow.index();
  
    // Change Td content of the row 
    dt_user.cell(rowIndex, 7).data(2);
  
    $(this).hide('fast');
    $(this).next().hide('fast');
    localStorage.setItem('orders', JSON.stringify(reverseToNestedStructure(dt_user.data().toArray())));
  
    });
  
});
