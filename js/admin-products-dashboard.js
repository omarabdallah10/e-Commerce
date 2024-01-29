
'use strict';
import {fetchAndStoreJson} from "./dumpJson.js"
'use strict';

import AuthModule from './Authentication/AuthModule.js';

AuthModule.isAdmin();

const productjsonFileURL ='assets/json/product-list.json';
fetchAndStoreJson(productjsonFileURL,'products');

// Datatable (jquery)
$(function () {
  var dt_user_table = $('.datatables-users'),
    select2 = $('.select2'),
    userView = 'app-user-view-account.html',

    // #STATUS 
    statusObj = {
      1: { title: 'Delivering', class: 'bg-label-info' },
      2: { title: 'Shipping', class: 'bg-label-success' },
      3: { title: 'Canceled', class: 'bg-label-danger' },
      // 4: { title: 'Canceled', class: 'bg-label-danger' },
    };
  // #SELECT2
    if (select2.length) {
      var $this = select2;
      $this.wrap('<div class="position-relative"></div>').select2({
        placeholder: 'Select Country',
        dropdownParent: $this.parent()
      }
  );
  }
  //#DATA
  // var userData1 = JSON.parse(localStorage.getItem('orders2')) || [];
  // console.log(userData1);
  var products = JSON.parse(localStorage.getItem('products')) || [];
  const allOrdersArray = [];

  for (const product in products) {
      const productData = products[product];
          allOrdersArray.push(productData);
  }
  console.log(allOrdersArray);
  // console.log(Object.values(userData["ID3"]));

  if (dt_user_table.length) {
      var dt_user = dt_user_table.DataTable({
      data: allOrdersArray, 
      //Sorting
      columns: [
        { data: '' },
        { data:'productID'},
        { data: 'productName' },
        { data: 'category' },
        { data: 'sellerId' },
        { data: 'stock' },
        { data: 'price' },
        {data:'actions'}

      ],
      // #MAPPING (Displaying Data)
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
          // #ProductID_Mapping
          targets: 1,
          render: function (data, type, full, meta) {
            return '<div class="d-flex col-1 flex-row">' +
              '<span class="fw-bold ">' +
              full['productId'] +
              '</span>' +
              '</div>';
          }
        },
        {
          // #Catogery_Mapping
          targets: 3,
          render: function (data, type, full, meta) {
            return '<div class="d-flex col flex-row ">' +
              full['category'] +
              '</div>';
          }
        },
        {
          // #SellerID_Mapping
          targets: 4,
          render: function (data, type, full, meta) {
            return '<div class="d-flex col flex-row ">' +
              full['sellerId'] +
              '</div>';
          }
        },
        {
          // #Quantity_Mapping
          targets: 5,
          render: function (data, type, full, meta) {
            return '<div class="d-flex col-2 flex-row ">' +
              full['stock'] +
              '</div>';
          }
        },
        
        {
          // #Name_Mapping
          targets:2,
          responsivePriority: 1,
          render: function (data, type, full, meta) {
            var $name = full['productName'],
              $details = full['details'],
              $image = full['avatar'];
            if ($image) {
              var $output =
                '<img src="' + assetsPath + 'img/avatars/' + $image + '" alt="Avatar" class="rounded-circle">';
            } else {
              var stateNum = Math.floor(Math.random() * 6);
              var states = ['success', 'danger', 'warning', 'info', 'dark', 'primary', 'secondary'];
              var $state = states[stateNum],
                $name = full['productName'],
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
              $name 
              // '</span ></a>' +
              // '<span class="text-muted">' +
              // $details +
              // '</span>' +
              // '</div>' +
              // '</div>';
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
          // Actions
          targets: -1,
          title: 'Actions',
          searchable: false,
          orderable: false,
          render: function (data, type, full, meta) {
            var $status = full['status'];
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
        // {
        //   // #Status_Mapping
        //   targets: 7,
        //   render: function (data, type, full, meta) {
        //     var $status = full['status'];

        //     return '<span class="badge ' + statusObj[$status].class + '">' + statusObj[$status].title + '</span>';
        //   }
        // },
      ],
      //#Order_Default
      order: [[1, 'dec']],
      // #RESPONSIVE
      responsive: {
        details: {
          display: $.fn.dataTable.Responsive.display.modal({
            header: function (row) {
              var data = row.data();
              return 'Details of ' + data['productName'];
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
        //#AddHere
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
                columns: [1, 2, 3,4,5,6],
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
                columns: [1, 2, 3,4,5,6],
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
                columns: [1, 2, 3,4,5,6],
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
                columns: [1,2,3,4,5,6],
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
                columns: [1, 2, 3,4,5,6],
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
        ,
        {
          text: '<i class="bx bx-plus me-0 me-sm-1"></i><span class="d-none d-sm-inline-block">Add Product</span>',
          className: 'add-new btn btn-primary',
          attr: {
            'data-bs-toggle': 'offcanvas',
            'data-bs-target': '#offcanvasAddProduct'
          }
        }
      ],
      
      
      
    });
    
  }
  function initializeFormValidation(formElement) {
    return FormValidation.formValidation(formElement, {
      fields: {
        productName: {
          validators: {
            notEmpty: {
              message: 'Please enter product name'
            }
          }
        },
        productDetails: {
          validators: {
            notEmpty: {
              message: 'Please enter product details'
            }
          }
        },
        productUnitPrice: {
          validators: {
            notEmpty: {
              message: 'Please enter product unit price'
            }
          }
        },
        productQuantity: {
          validators: {
            notEmpty: {
              message: 'Please enter product quantity'
            }
          }
        },
        productCategory: {
          validators: {
            notEmpty: {
              message: 'Please select a product category'
            }
          }
        }
      },
      plugins: {
        trigger: new FormValidation.plugins.Trigger(),
        bootstrap5: new FormValidation.plugins.Bootstrap5({
          eleValidClass: '',
          rowSelector: function (field, ele) {
            return '.mb-3';
          }
        }),
        submitButton: new FormValidation.plugins.SubmitButton(),
        autoFocus: new FormValidation.plugins.AutoFocus()
      }
    });
  }
  function transformToIndexedObject(products) {
    return products.reduce((result, product) => {
      result[product.productId] = product;
      return result;
    }, {});
  }
        //Edit
        
  $('body').on('click', '.datatables-users tbody tr .edit-record', function () {

    //edit record
    $(".datatables-users tbody tr").removeClass("selected");

        // Add the 'selected' class to the clicked row
        $(this).closest('tr').addClass("selected");
    var tr = $(this).parents('tr');
    var row = dt_user.row(tr);
    var rowData = row.data();
    $("#edit-product-name").val(rowData['productName']);
    $("#edit-product-details").val(rowData['details']);
    $("#edit-product-unitprice").val(rowData['price']);
    $("#edit-product-quantity").val(rowData['stock']);
    $("#edit-product-category").val(rowData['category']);
    $("#offcanvasEditProduct").offcanvas('show');

  });
  
  let form2 = document.getElementById('editNewProductForm');

  let fv2 = initializeFormValidation(form2);
  // Delete Record
  $('.datatables-users tbody').on('click', '.delete-record', function () {
    $(".datatables-users tbody tr").removeClass("selected");

        // Add the 'selected' class to the clicked row
        $(this).addClass("selected");
    dt_user.row($(this).parents('tr')).remove().draw();
    localStorage.setItem('products', JSON.stringify(transformToIndexedObject(dt_user.data().toArray())));
  });

  $('#offcanvasEditProduct .btn-primary').on('click', function () {
    // Trigger the validation
    fv2.validate().then(function (status) {
      if (status === 'Valid') {
        // If the form is valid, proceed with adding the product
        var maxId = 0;
        dt_user.data().each(function (row) {
          if (row.productId > maxId) {
            maxId = row.productId;
          }
        });
        const selectedRow = $('.datatables-users tbody .selected');
        const rowIndex = dt_user.row(selectedRow).index();
      
  
        dt_user.row(rowIndex).data({
          productId:dt_user.row(rowIndex).data().productId,
          productName: $("#edit-product-name").val(),
          details:  $("#edit-product-details").val(),
          price: $("#edit-product-unitprice").val(),
          stock: Number($("#edit-product-quantity").val()),
          category: $("#edit-product-category option:selected").text(),
          thumbnail: dt_user.row(rowIndex).data().thumbnail,
          images: dt_user.row(rowIndex).data().images,
          sellerId: dt_user.row(rowIndex).data().sellerId,
          dateAdded: dt_user.row(rowIndex).data().dateAdded,
          discount: dt_user.row(rowIndex).data().discount,
          rating: dt_user.row(rowIndex).data().rating,
          size: dt_user.row(rowIndex).data().size,

          }).draw();
        
        
        localStorage.setItem('products', JSON.stringify(dt_user.data().toArray()));

        // Reset the form
        editNewProductForm.reset();

        // Close the offcanvas
        $("#offcanvasEditProduct").offcanvas('hide');
      }


    }
    
    );
    });
    // Example usage:
  let form1 = document.getElementById('addNewProductForm');
  let fv1 = initializeFormValidation(form1);
  $('#offcanvasAddProduct .btn-primary').on('click', function () {
    // Trigger the validation
    fv1.validate().then(function (status) {
      if (status === 'Valid') {
        // If the form is valid, proceed with adding the product
        var maxId = 0;
        dt_user.data().each(function (row) {
          if (Number(row.productId) > Number(maxId)) {
            maxId = Number(row.productId);
          }
        });
      
        let currentDate = new Date().toISOString().split('T')[0];
  
        dt_user.row.add({
          productId:maxId+1,
          productName: $("#add-product-name").val(),
          details:  $("#add-product-details").val(),
          price: $("#add-product-unitprice").val(),
          stock: $("#add-product-quantity").val(),
          category: $("#add-product-category option:selected").text(),
          thumbnail: 'img/4/1.png',
          images: 'img/4/1.png,img/4/2.png,img/4/3.png,img/4/4.png',
          sellerId: 's1',
          dateAdded: currentDate,
          discount: 10,
          rating: 4.5,
          size: 'M,L,XL,XXL'
          }).draw();
        
        
        localStorage.setItem('products', JSON.stringify(dt_user.data().toArray()));

        // Reset the form
        addNewProductForm.reset();

        // Close the offcanvas
        $("#offcanvasAddProduct").offcanvas('hide');
      }
  }
  );
}
);

  });
