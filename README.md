npm run webpack:prod

http://member-platform.labo.io/
1/ Quản lý khách hàng: http://member-platform.labo.io/#/app/views/customers/user-management
    1.1/ Thêm mới/xoá: popup
    1.2/ Sửa thông tin khách hàng: http://member-platform.labo.io/#/app/views/customers/user-management/info/53d1bd86-7e59-4114-867b-05221b0028e3
    1.3/ Import thông tin khách hàng: http://member-platform.labo.io/#/app/views/customers/user-management/new
    1/4/ Xuất dữ liệu thông tin khách hàng: file
    
2/ Quản lý nhóm: http://member-platform.labo.io/#/app/views/customers/user-group
    2.1/ Thêm mới/sửa/xoá: popup (hiện nhóm là bộ filter, khi thực hiện và khi cấu hình kết quả sẽ khác nhau)

3/ Quản lý thuộc tính khách hàng (động): http://member-platform.labo.io/#/app/views/customers/user-properties
    3.1/ Thêm mới/sửa/xoá: popup
    3.1/ Thêm từ template: popup

4/ Quản lý tag: http://member-platform.labo.io/#/app/views/customers/tag-management
    4.1/ Thêm mới/sửa/xoá: popup => đùng làm thuộc tính cho khách hàng
    
    
5/ Cấu hình email: http://member-platform.labo.io/#/app/views/config/emails
    5.1/ Thêm mới: http://member-platform.labo.io/#/app/views/config/emails/add
    5.2/ Thêm mới từ template: http://member-platform.labo.io/#/app/views/config/email-template
    
6/ Cấu hình email gửi: http://member-platform.labo.io/#/app/views/config/email-profile
    6.1/ Thêm mới: popup

7/ Dashboard chiến dịch tự động: http://member-platform.labo.io/#/app/views/campaigns/campaign-auto
    7.1/ Xem chi tiết topo không sửa được (trạng thái khác bản nháp) : http://member-platform.labo.io/#/flow/details
    7.2/ Xem chi tiết topo sửa được (trạng thái bản nháp): http://member-platform.labo.io/#/flow
    
    
8/ Chiến dịch tự động: http://member-platform.labo.io/#/app/views/campaigns/campaign-management
    8.1/ Tạo mới: http://member-platform.labo.io/#/app/views/campaigns/campaign-management/new
        8.1.1/ Tạo không theo mẫu: click tạo mới => http://member-platform.labo.io/#/flow
        8.1.2/ Tạo theo mẫu: click template => http://member-platform.labo.io/#/flow
    8.2/ Xem chi tiết: http://member-platform.labo.io/#/flow/details
    8.3/ Xem danh sách version: http://member-platform.labo.io/#/app/views/campaigns/campaign-management/version/f9427818-540c-4499-9c90-a42d95e94d9e
    8.4/ Tạo mới/sửa/xoá thư mục: popup
    8.5/ Chọn tag/tạo mới tag: popup

9/ Chiến dịch khách hàng: http://member-platform.labo.io/#/app/views/campaigns/user-campaign
    9.1/ Thêm mới chiến dịch: http://member-platform.labo.io/#/app/views/campaigns/user-campaign/new
    9.2/ Xem thông tin: popup


NAV MENU : webapp/app/app.tsx => AppRoutes: \webapp\app\routes\index.tsx
LOGIN : \webapp\app\views\login\login.tsx,
------------------------------------------------------- CUSTOMER MANAGEMET -----------------------------------------
ROUTER CUSTOMER : webapp\app\views\customer\index.tsx,
LIST CUSTOMER MANAGER : webapp\app\views\customer\user-management\list\user-management.tsx
ADVANCED CUSTOMER : app\views\customer\user-management\list\search-save-modal\search-save-modal.tsx,
MULTI SELECT TAG : app\views\customer\user-management\list\categories-tag\categories-tag.tsx,
INFOMATION CUSTOMER : app\views\customer\user-management\infomation\infomation.tsx,
BENEFIT MEMBER : webapp\app\views\customer\user-management\infomation\member\member.tsx,
HISTORY ACTIVE MEMBER : webapp\app\views\customer\user-management\infomation\history-active\history-active.tsx,
DETAIL MEMBER : webapp\app\views\customer\user-management\infomation\basic\basic.tsx,
MODAL MERGE CUSTOMER : webapp\app\views\customer\user-management\infomation\basic\merge\merge.tsx,
MODAL DELETE CUSTOMER : webapp\app\views\customer\user-management\infomation\basic\delete\delete.tsx,
IMPORT FILE CUSTOMER : webapp\app\views\customer\user-management\import\import.tsx,
DETAIL IMPORT : webapp\app\views\customer\user-management\import\detail\detail.tsx,
MODAL CREATE NEW CUSTOMER : webapp\app\views\customer\user-management\create\create.tsx,
--------------------------------------------------------- PROPERTY MANAGEMET -----------------------------------------
LIST PROPERTY : webapp\app\views\customer\properties-customer\list\properties-customer.tsx
MODAL EDIT PROPERTY : webapp\app\views\customer\properties-customer\edit\edit.tsx
MODAL DELETE PROPERTY : webapp\app\views\customer\properties-customer\delete\delete.tsx
CREATE GROUP PROPERTY : webapp\app\views\customer\properties-customer\create-group\create-group.tsx,
CREATE SINGLE PROPERTY : webapp\app\views\customer\properties-customer\create\create.tsx,
--------------------------------------------------------- TAG MANAGEMET -----------------------------------------
LIST TAG : webapp\app\views\customer\tag-management\tag-list\tag-list.tsx,
CREATE TAG : app\views\customer\tag-management\tag-add-new\tag-add-new.tsx
TAG MODAL EDIT/CREATE/DELETE : webapp\app\views\customer\tag-management\tag-modal
--------------------------------------------------------- GROUP MANAGEMET -----------------------------------------
LIST GROUP CUSTOMER : webapp\app\views\customer\group-attribute-customer\group-list-customer\group-list-customer.tsx
LIST CUSTOMER : webapp\app\views\customer\group-attribute-customer\group-customer\group-customer.tsx,
MODAL DELETE CUSTOMER : webapp\app\views\customer\group-attribute-customer\group-customer\group-delete-modal\group-delete-modal.tsx
MODAL UPDATE/COPPY/INSERT CUSTOMER GROUP : webapp\app\views\customer\group-attribute-customer\group-modal-config\group-modal-config.tsx
FIELD DATA GET FROM PROPERTY : webapp\app\views\customer\group-attribute-customer\group-modal-config\field-data\field-data.tsx
--------------------------------------------------------- CAMPAIGN MANAGEMET -----------------------------------------
ROUTER CAMPAIGN  : webapp\app\views\campaign\index.tsx
--------------------------------------------------------- CAMPAIGN MEMBER GET MEMBER -----------------------------------------
LIST CAMPAIGN : webapp\app\views\campaign\user-campaign\list\campaign-management.tsx
TAB STATUS : webapp\app\views\campaign\user-campaign\list\tab\all-camp\all-camp.tsx
MODAL VIEW INFO CAMPAIGN : webapp\app\views\campaign\user-campaign\list\tab\all-camp\modal\modal.tsx
CREATE CAMPAIGN : webapp\app\views\campaign\user-campaign\create\create.tsx,
INFO CAMPAIGN : webapp\app\views\campaign\user-campaign\create\info\info.tsx
STEP CREATE CAMPAIGN : webapp\app\views\campaign\user-campaign\create\navigation\navigation.tsx
--------------------------------------------------------- CAMPAIGN AUTO -----------------------------------------
LIST CAMPAIGN AUTO : webapp\app\views\campaign\campaign-automation\list\campaign-automation.tsx
LIST CAMPAIGN MANAGEMET : webapp\app\views\campaign\campaign-automation\campaign-management\campaign-management.tsx,
COMPONENT TREE FOLDER : webapp\app\views\campaign\campaign-automation\campaign-management\tree-folder\tree-folder.tsx
LIST DETAIL FOLDER : webapp\app\views\campaign\campaign-automation\campaign-management\campaign-list\campaign-list.tsx
VERSION LIST : webapp\app\views\campaign\campaign-automation\campaign-management\campaign-list\version-list\version-list.tsx
TEMPLATE CAMPAIGN : webapp\app\views\campaign\campaign-automation\campaign-management\campaign-list\create-campaign\create-campaign.tsx
CJ TAG MODAL EDIT/INSERT/DELETE  : webapp\app\views\campaign\campaign-automation\campaign-management\campaign-list\cj-tag-modal
