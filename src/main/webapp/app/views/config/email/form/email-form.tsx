import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import CKEditor from 'ckeditor4-react';
import { Input, Button as Btn, Row, Popover, Tabs } from 'antd';
import { Table, Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { Translate, translate } from 'react-jhipster';
import { IRootState } from 'app/reducers';
import LoaderAnim from 'react-loaders';
import Loader from 'react-loader-advanced';
import SweetAlert from 'sweetalert-react';
import { IContentParams, IEmailSave } from 'app/common/model/email-config.model';
import { GROUP_PARAM } from 'app/constants/email-config';
import { getContentParamAction, createEmailAction, editEmailAction, createEmailTemplateAction } from 'app/actions/email-config';
import './email-form.scss';
import { RouteComponentProps } from 'react-router-dom';
import PreviewEmailLanding from '../../email-template/preview/preview';

//TODO: step 1
import EmailEditor from 'react-email-editor';

interface IEmailFormManagementProps extends StateProps, DispatchProps, RouteComponentProps<{ id: any; idTemplate: any }> {}
interface IEmailFormManagementState {
  visiblePopOver: boolean;
  activeKey: string;
  contentParams: IContentParams[];
  emailsave: IEmailSave;
  messageErrorEmailName: any;
  messageErrorEmailSubject: any;
  openModal: boolean;
}

const { TabPane } = Tabs;
const groupParams = [
  {
    name: 'EVoucher',
    code: GROUP_PARAM.E_VOUCHER
  },
  {
    name: 'Contact',
    code: GROUP_PARAM.CUSTOMER
  },
  {
    name: 'Campaign',
    code: GROUP_PARAM.CAMPAIGN
  }
];

class EmailFormManagement extends React.Component<IEmailFormManagementProps, IEmailFormManagementState> {
  state: IEmailFormManagementState = {
    visiblePopOver: false,
    activeKey: groupParams[0].code,
    contentParams: [],
    emailsave: {},
    messageErrorEmailName: '',
    messageErrorEmailSubject: '',
    openModal: false
  };

  //TODO: step 2
  editor: any;
  onLoad = () => {
    console.log('onLoad');
    console.log(this.editor);
    // this.editor.addEventListener('onDesignLoad', this.onDesignLoad)
    //this.editor.loadDesign(design)
  };

  saveDesign = () => {
    this.editor.saveDesign(design => {
      console.log('saveDesign', design);
      alert('Design JSON has been logged in your developer console.');
    });
  };

  exportHtml = () => {
    this.editor.exportHtml(data => {
      const { design, html } = data;
      console.log('exportHtml', html);
      alert('Output HTML has been logged in your developer console.');
    });
  };

  onDesignLoad = data => {
    console.log('onDesignLoad', data);
    console.log(this.editor);
    // if(this.editor){
    //   this.editor.registerCallback('image', function(file, done) {
    //     console.log("upload");
    //     console.log(file);
    //
    //     // var data = new FormData();
    //     // data.append('file', file.attachments[0]);
    //     //
    //     // fetch('/uploads', {
    //     //   method: 'POST',
    //     //   headers: {
    //     //     'Accept': 'application/json'
    //     //   },
    //     //   body: data
    //     // }).then(response => {
    //     //   // Make sure the response was valid
    //     //   if (response.status >= 200 && response.status < 300) {
    //     //     return response
    //     //   } else {
    //     //     var error = new Error(response.statusText)
    //     //     error.response = response
    //     //     throw error
    //     //   }
    //     // }).then(response => {
    //     //   return response.json()
    //     // }).then(data => {
    //     //   // Pass the URL back to Unlayer to mark this upload as completed
    //     //   done({ progress: 100, url: data.filelink })
    //     // });
    //   })
    // }
  };

  async componentDidMount() {
    let emailId = this.props.match.params.id;
    let idTemplate = this.props.match.params.idTemplate;
    // edit, copy email
    if (emailId) {
      this.setState({
        emailsave: {
          id: this.props.emailDetail.id,
          name: this.props.emailDetail.name,
          subject: this.props.emailDetail.subject,
          content: this.props.emailDetail.content
        }
      });
    }
    // copy email-template
    if (idTemplate) {
      let emailTemplate: any;
      emailTemplate = this.props.listContentTemplate;
      this.setState({
        emailsave: {
          name: emailTemplate.name,
          subject: emailTemplate.subject,
          content: emailTemplate.content
        }
      });
    }
    await this.props.getContentParamAction();
    this.getContentParam(this.state.activeKey);
  }

  back = () => {
    location.assign('#/app/views/config/emails');
  };

  onChangeInput = (value, field) => {
    let emailSave = this.state.emailsave;
    emailSave[field] = value;
    this.setState({
      emailsave: emailSave
    });
    switch (field) {
      case 'name':
        this.validateEmailName(emailSave);
        break;
      case 'subject':
        this.validateEmailSubject(emailSave);
        break;
      default:
        break;
    }
  };

  toggleModal = () => {
    this.setState({ openModal: !this.state.openModal });
  };

  preview = emailSave => {
    this.setState({
      emailsave: emailSave,
      openModal: true
    });
  };

  validateEmailName(emailSave: IEmailSave) {
    if (emailSave && emailSave.name && emailSave.name.trim() !== '') {
      this.setState({
        messageErrorEmailName: ''
      });
    } else {
      this.setState({
        messageErrorEmailName: (
          <div>
            <label className="message-error" style={{ color: 'red', marginLeft: '90px' }}>
              Tên email không được để trống
            </label>
          </div>
        )
      });
    }
  }

  validateEmailSubject(emailSave: IEmailSave) {
    if (emailSave && emailSave.subject && emailSave.subject.trim() !== '') {
      this.setState({
        messageErrorEmailSubject: ''
      });
    } else {
      this.setState({
        messageErrorEmailSubject: (
          <div>
            <label className="message-error" style={{ color: 'red', marginLeft: '90px' }}>
              Tiêu đề email không được để trống
            </label>
          </div>
        )
      });
    }
  }

  validateForm = (emailSave: IEmailSave) => {
    this.validateEmailName(emailSave);
    this.validateEmailSubject(emailSave);
    if (emailSave.name && emailSave.name.trim() !== '' && emailSave.subject && emailSave.subject.trim() !== '') {
      return true;
    }
    return false;
  };

  createEmailTemplate = () => {
    let { emailsave } = this.state;
    if (this.validateForm(emailsave)) {
      let emailSaveValidate = {
        ...emailsave,
        name: emailsave.name.trim(),
        subject: emailsave.subject.trim()
      };
      this.props.createEmailTemplateAction(emailSaveValidate);
    }
  };

  saveEmail = () => {
    let emailId = this.props.match.params.id;
    let url = this.props.match.url;
    let { emailsave } = this.state;
    if (this.validateForm(emailsave)) {
      let emailSaveValidate = {
        ...emailsave,
        name: emailsave.name.trim(),
        subject: emailsave.subject.trim()
      };

      // update
      if (emailId && url && url.includes('edit')) {
        this.props.editEmailAction(emailId, emailSaveValidate);
      } else {
        // create, copy
        this.props.createEmailAction(emailSaveValidate);
      }
    }
  };

  title = (
    <div className="title-content-param">
      <label>Add a Persionaliztion</label>
      <Btn
        onClick={() => {
          this.handleVisibleChange(false);
        }}
      >
        <i className="pe-7s-close-circle" />
      </Btn>
    </div>
  );

  getContentParam = activeKey => {
    this.setState({
      activeKey,
      contentParams: this.props.contentParams.filter(item => item.groupParam === activeKey)
    });
  };

  handleVisibleChange = visible => {
    this.setState({ visiblePopOver: visible });
  };

  content = () => {
    let content = (
      <div className="content-param">
        <Tabs tabPosition={'left'} onChange={this.getContentParam} defaultActiveKey={this.state.activeKey}>
          {groupParams.map((item, index) => (
            <TabPane tab={item.name} key={item.code}>
              {this.state.contentParams
                ? this.state.contentParams.map((item, index) => (
                    <div className="tabs-param" key={index}>
                      <label
                        onClick={() => {
                          this.selectParam(item.paramCode);
                        }}
                      >
                        {item.paramName}
                      </label>
                    </div>
                  ))
                : ''}
            </TabPane>
          ))}
        </Tabs>
      </div>
    );
    return content;
  };

  onEditorChange = event => {
    let emailSave = this.state.emailsave;
    emailSave.content = event.editor.getData();
    this.setState({
      emailsave: emailSave
    });
  };

  selectParam = paramCode => {
    let sel, range;
    let newWindow = document.getElementsByTagName('iframe')[0].contentWindow;
    if (newWindow.getSelection()) {
      sel = newWindow.getSelection();
      if (sel.rangeCount) {
        range = sel.getRangeAt(0);
        range.deleteContents();
        range.insertNode(document.createTextNode(paramCode + ' '));
      }
    }

    let newValue = document.getElementsByTagName('iframe')[0].contentWindow.document;
    this.setState({
      emailsave: {
        ...this.state.emailsave,
        content: newValue.body.innerHTML
      }
    });
  };

  render() {
    let { emailsave, messageErrorEmailName, messageErrorEmailSubject, openModal } = this.state;
    const spinner1 = <LoaderAnim type="ball-pulse" active={true} />;
    return (
      <Loader message={spinner1} show={false} priority={1}>
        <Fragment>
          <Modal className="modal-config-preview" isOpen={openModal}>
            <ModalHeader toggle={this.toggleModal}>Landing preview</ModalHeader>
            <ModalBody>
              <PreviewEmailLanding contentParams={this.props.contentParams} htmlDOM={emailsave.content} styleForDOM={''} />
            </ModalBody>
            <ModalFooter>
              <Btn type="danger" onClick={this.toggleModal}>
                Thoát
              </Btn>
            </ModalFooter>
          </Modal>
          <div className="email-form-management">
            <div className="email-form-title-header">
              <Button color="primary" onClick={this.back}>
                Back
              </Button>
              <div className="button-group">
                <Button color="primary" onClick={this.saveEmail}>
                  Save
                </Button>
                <Button color="primary" onClick={this.createEmailTemplate} style={{ marginLeft: '10px', marginRight: '10px' }}>
                  Save as Template
                </Button>
              </div>
            </div>
            <div className="email-form-body">
              <div className="email-input-group">
                <label>Email Name</label>
                <Input
                  className="tab-info"
                  id="email-name"
                  type="text"
                  placeholder=""
                  value={emailsave.name}
                  onChange={event => this.onChangeInput(event.target.value, 'name')}
                  maxLength={160}
                />
              </div>
              {messageErrorEmailName}
              <div className="email-input-group">
                <label>Email Subject</label>
                <Input
                  className="tab-info"
                  id="email-subject"
                  type="text"
                  placeholder=""
                  value={emailsave.subject}
                  onChange={event => this.onChangeInput(event.target.value, 'subject')}
                  maxLength={160}
                />
              </div>
              {messageErrorEmailSubject}
              <div className="email-content">
                <div style={{ float: 'right' }}>
                  <Popover
                    placement="leftTop"
                    title={this.title}
                    content={this.content()}
                    visible={this.state.visiblePopOver}
                    onVisibleChange={this.handleVisibleChange}
                    trigger="click"
                  >
                    <Button color="primary">Variables</Button>
                  </Popover>
                  <label
                    onClick={() => this.preview(emailsave)}
                    style={{ marginLeft: '10px', textDecoration: 'underline', color: '#3866DD' }}
                  >
                    <FontAwesomeIcon icon={faEye} />
                    <span style={{ paddingLeft: '10px' }}>Preview</span>
                  </label>
                </div>
                <div style={{ clear: 'both' }}></div>
                <div style={{ marginTop: '10px' }}>
                  {/*TODO: step 3*/}
                  <EmailEditor
                    ref={editor => (this.editor = editor)}
                    onLoad={this.onLoad}
                    onDesignLoad={this.onDesignLoad}
                    options={{
                      projectId: 1071,
                      locale: 'en-US',
                      translations: {
                        //TODO
                        'en-US': {
                          'buttons.add_content': 'Thêm nội dung',
                          'buttons.add_field': 'Add Field',
                          'buttons.add_new_field': 'Add New Field',
                          'buttons.add_row': 'Add Row',
                          'buttons.add_text': 'Add Text',
                          'buttons.apply': 'Apply',
                          'buttons.apply_effects': 'Apply Effects & More',
                          'buttons.background': 'Background',
                          'buttons.cancel': 'Cancel',
                          'buttons.change_image': 'Change Image',
                          'buttons.close': 'Close',
                          'buttons.corners': 'Corners',
                          'buttons.crop': 'Crop',
                          'buttons.delete': 'Delete',
                          'buttons.deselect': 'Deselect',
                          'buttons.desktop': 'Desktop',
                          'buttons.done': 'Done',
                          'buttons.draw': 'Draw',
                          'buttons.drawing': 'Drawing',
                          'buttons.duplicate': 'Duplicate',
                          'buttons.filter': 'Filter',
                          'buttons.frame': 'Frame',
                          'buttons.history': 'History',
                          'buttons.merge': 'Merge',
                          'buttons.mobile': 'Mobile',
                          'buttons.more_options': 'More Options',
                          'buttons.open': 'Open',
                          'buttons.resize': 'Resize',
                          'buttons.save': 'Save',
                          'buttons.shape': 'Shape',
                          'buttons.shapes': 'Shapes',
                          'buttons.show_fewer_options': 'Show Fewer Options',
                          'buttons.show_more_options': 'Show More Options',
                          'buttons.sticker': 'Sticker',
                          'buttons.stickers': 'Stickers',
                          'buttons.transform': 'Transform',
                          'buttons.update_field': 'Update Field',
                          'buttons.upload': 'Upload',
                          'buttons.upload_image': 'Upload Image',
                          'buttons.zoom': 'Zoom',
                          'colors.black': 'Black',
                          'colors.ruby': 'Ruby',
                          'colors.white': 'White',
                          'content_tools.button': 'Button',
                          'content_tools.columns': 'Columns',
                          'content_tools.divider': 'Divider',
                          'content_tools.form': 'Form',
                          'content_tools.html': 'HTML',
                          'content_tools.image': 'Image',
                          'content_tools.social': 'Social',
                          'content_tools.text': 'Text',
                          'content_tools.video': 'Video',
                          'editor.align.label': 'Align',
                          'editor.alignment.label': 'Alignments',
                          'editor.all_sides.label': 'All Sides',
                          'editor.alternate_text.label': 'Alternate Text',
                          'editor.background_color.label': 'Background Color',
                          'editor.background_image.center': 'Center',
                          'editor.background_image.cover_mode': 'Cover Mode',
                          'editor.background_image.full_width': 'Full Width',
                          'editor.background_image.label': 'Background Image',
                          'editor.background_image.repeat': 'Repeat',
                          'editor.border.dashed': 'Dashed',
                          'editor.border.dotted': 'Dotted',
                          'editor.border.label': 'Border',
                          'editor.border.solid': 'Solid',
                          'editor.bottom.label': 'Bottom',
                          'editor.button_link.label': 'Button Link',
                          'editor.color.label': 'Color',
                          'editor.colors.label': 'Colors',
                          'editor.columns_background.label': 'Columns Background',
                          'editor.container_padding.label': 'Container Padding',
                          'editor.content_background_color.label': 'Content Background Color',
                          'editor.content_width.label': 'Content Width',
                          'editor.do_not_stack_on_mobile.label': 'Do Not Stack on Mobile',
                          'editor.fields.label': 'Fields',
                          'editor.font_family.label': 'Font Family',
                          'editor.font_size.label': 'Font Size',
                          'editor.form_alignment.label': 'Form Alignment',
                          'editor.form_width.label': 'Form Width',
                          'editor.full_width.label': 'Full Width',
                          'editor.height.label': 'Height',
                          'editor.hide_on_desktop.label': 'Hide on Desktop',
                          'editor.hide_on_mobile.label': 'Hide on Mobile',
                          'editor.hover_background.label': 'Hover Background',
                          'editor.hover_color.label': 'Hover Color',
                          'editor.hover_text.label': 'Hover Text',
                          'editor.hover_underline.label': 'Hover Underline',
                          'editor.icon_spacing.label': 'Icon Spacing',
                          'editor.icon_type.label': 'Icon Type',
                          'editor.image.added_drawing': 'Added: drawing',
                          'editor.image.added_frame': 'Added: frame',
                          'editor.image.added_overlay_image': 'Added: overlay image',
                          'editor.image.added_shape': 'Added: shape',
                          'editor.image.added_sticker': 'Added: sticker',
                          'editor.image.added_text': 'Added: text',
                          'editor.image.applied_crop': 'Applied: crop',
                          'editor.image.applied_filter': 'Applied: filter',
                          'editor.image.applied_resize': 'Applied: resize',
                          'editor.image.applied_rounded_corners': 'Applied: rounded corners',
                          'editor.image.applied_transform': 'Applied: transform',
                          'editor.image.brush_color': 'Brush Color',
                          'editor.image.brush_size': 'Brush Size',
                          'editor.image.brush_type': 'Brush Type',
                          'editor.image.canvas_background': 'Canvas Background',
                          'editor.image.changed_background': 'Changed: background',
                          'editor.image.changed_background_image': 'Changed: background image',
                          'editor.image.changed_style': 'Changed: style',
                          'editor.image.drop_upload': 'Drop a new image here, or click to select files to upload.',
                          'editor.image.image_options': 'Image Options',
                          'editor.image.image_url': 'Image URL',
                          'editor.image.initial': 'Initial',
                          'editor.image.label': 'Image',
                          'editor.image.loaded_state': 'Loaded: state',
                          'editor.image.maintain_aspect_ratio': 'Maintain Aspect Ratio',
                          'editor.image.main_image': 'Main Image',
                          'editor.image.objects_merged': 'Objects: merged',
                          'editor.image.offset_x': 'Offset X',
                          'editor.image.offset_y': 'Offset Y',
                          'editor.image.outline_width': 'Outline Width',
                          'editor.image.uploading': 'Uploading',
                          'editor.image.upload_error':
                            "There was an error uploading your image. Make sure it's a valid image file with size under {mbSize} MB.",
                          'editor.image.use_percentages': 'Use Percentages',
                          'editor.image_link.label': 'Image Link',
                          'editor.inherit_body_styles.label': 'Inherit Body Styles',
                          'editor.left.label': 'Left',
                          'editor.line.label': 'Line',
                          'editor.line_height.label': 'Line Height',
                          'editor.link.new_tab': 'New Tab',
                          'editor.link.same_tab': 'Same Tab',
                          'editor.link.url': 'URL',
                          'editor.link_color.label': 'Link Color',
                          'editor.margin.label': 'Margin',
                          'editor.padding.label': 'Padding',
                          'editor.placeholder.text': 'No content here. Drag content from right.',
                          'editor.play_icon_color.label': 'Play Icon Color',
                          'editor.play_icon_size.label': 'Play Icon Size',
                          'editor.play_icon_type.label': 'Play Icon Type',
                          'editor.right.label': 'Right',
                          'editor.rounded_border.label': 'Rounded Border',
                          'editor.social_links.label': 'Social Links',
                          'editor.space_between_fields.label': 'Space Between Fields',
                          'editor.text.label': 'Text',
                          'editor.text_align.label': 'Text Align',
                          'editor.text_color.label': 'Text Color',
                          'editor.top.label': 'Top',
                          'editor.underline.label': 'Underline',
                          'editor.video.arrow_only': 'Arrow Only',
                          'editor.video.video_camera': 'Video Camera',
                          'editor.video_url.description':
                            'Add a YouTube or Vimeo URL to automatically generate a preview image. The image will link to the provided URL.',
                          'editor.video_url.label': 'Video URL',
                          'editor.width.label': 'Width',
                          'editors_panel.title.content': 'Content',
                          'editors_panel.title.contents': 'Content',
                          'editors_panel.title.rows': 'Row',
                          'fields.birthday': 'Birthday',
                          'fields.company': 'Company',
                          'fields.name': 'Name',
                          'fields.phone_number': 'Phone Number',
                          'fields.website': 'Website',
                          'fields.zip_code': 'Zip Code',
                          'labels.align_text': 'Align Text',
                          'labels.blur': 'Blur',
                          'labels.category': 'Category',
                          'labels.color_picker': 'Color Picker',
                          'labels.desktop_preview': 'Desktop Preview',
                          'labels.editor': 'Editor',
                          'labels.font': 'Font',
                          'labels.format_text': 'Format Text',
                          'labels.google_fonts': 'Google Fonts',
                          'labels.gradient': 'Gradient',
                          'labels.loading': 'Loading',
                          'labels.loading_images': 'Loading Images',
                          'labels.merge_tags': 'Merge Tags',
                          'labels.mobile_preview': 'Mobile Preview',
                          'labels.no_results': 'No Results',
                          'labels.objects': 'Objects',
                          'labels.outline': 'Outline',
                          'labels.radius': 'Radius',
                          'labels.redo': 'Redo',
                          'labels.search': 'Search',
                          'labels.search_images': 'Search millions of images',
                          'labels.shadow': 'Shadow',
                          'labels.size': 'Size',
                          'labels.stock_photos_by': 'Powered by Unsplash, Pexels, Pixabay.',
                          'labels.stock_photos_license': 'All images licensed under Creative Commons Zero.',
                          'labels.tags': 'Tags',
                          'labels.texture': 'Texture',
                          'labels.text_style': 'Text Style',
                          'labels.undo': 'Undo',
                          'modals.category.invalid': 'This is an invalid category name',
                          'modals.category.placeholder': 'Category Name',
                          'modals.delete.columns':
                            'You will lose {columns, number} {columns, plural, one {column} other {columns}}. Are you sure?',
                          'modals.delete.confirmation': 'Are you sure you want to delete this? This action cannot be undone.',
                          'modals.delete.title': 'Delete',
                          'modals.preview.title': 'Preview',
                          'modals.save_block.title': 'Save Block',
                          'modals.tags.description': 'Tags are used for searching. Multiple tags can be separated by a comma.',
                          'modals.tags.placeholder': 'tag1, tag2',
                          'option_groups.action.title': 'Action',
                          'option_groups.all.title': 'All',
                          'option_groups.blank.title': 'Blank',
                          'option_groups.button.title': 'Button',
                          'option_groups.colors.title': 'Colors',
                          'option_groups.columns.title': 'Columns',
                          'option_groups.column_number.title': 'Column {columnNumber}',
                          'option_groups.column_properties.title': 'Column Properties',
                          'option_groups.default.title': 'General',
                          'option_groups.fields.title': 'Fields',
                          'option_groups.html.title': 'HTML',
                          'option_groups.icons.title': 'Icons',
                          'option_groups.image.title': 'Image',
                          'option_groups.labels.title': 'Labels',
                          'option_groups.last_saved.title': 'Last Saved',
                          'option_groups.layout.title': 'Layout',
                          'option_groups.line.title': 'Line',
                          'option_groups.link.title': 'Link',
                          'option_groups.links.title': 'Links',
                          'option_groups.mobile.title': 'Mobile',
                          'option_groups.responsive.title': 'Responsive Design',
                          'option_groups.row_properties.title': 'Row Properties',
                          'option_groups.spacing.title': 'Spacing',
                          'option_groups.text.title': 'Text',
                          'shapes.circle': 'Circle',
                          'shapes.rectangle': 'Rectangle',
                          'shapes.round': 'Round',
                          'shapes.square': 'Square',
                          'sizes.large': 'Large',
                          'sizes.largest': 'Largest',
                          'sizes.medium': 'Medium',
                          'sizes.small': 'Small',
                          'sizes.smallest': 'Smallest',
                          'tools.form.field_label': 'Field Label',
                          'tools.form.field_name': 'Field Name',
                          'tools.form.field_type': 'Field Type',
                          'tools.form.field_value': 'Field Value',
                          'tools.form.new_field': 'New Field',
                          'tools.form.options_one_per_line': 'Options (One Per Line)',
                          'tools.form.placeholder_text': 'Placeholder Text',
                          'tools.form.required_field': 'Required Field',
                          'tools.form.show_label': 'Show Label',
                          'tools.form.update_field': 'Update Field',
                          'tools.social.click_icons_to_add': 'Click the icons to add',
                          'tools.tabs.blocks': 'Blocks',
                          'tools.tabs.body': 'Body',
                          'tools.tabs.content': 'Content',
                          'tools.tabs.images': 'Images',
                          'tools.tabs.row': 'Row',
                          'tools.text.personalize': 'Personalize'
                        }
                      },
                      customCSS: [
                        `
          body {
            background-color: yellow;
          }
        `
                      ]
                    }}
                  />

                  <CKEditor
                    id={'ckeditor'}
                    data={emailsave.content}
                    config={{
                      extraPlugins: 'stylesheetparser',
                      height: 450
                    }}
                    onBeforeLoad={CKEDITOR => (CKEDITOR.disableAutoInline = true)}
                    onChange={this.onEditorChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      </Loader>
    );
  }
}

const mapStateToProps = ({ emailConfigState, userCampaign }: IRootState) => ({
  contentParams: emailConfigState.contentParams,
  emailDetail: emailConfigState.emailDetail,
  listContentTemplate: userCampaign.listContentTemplate
});

const mapDispatchToProps = {
  getContentParamAction,
  createEmailAction,
  editEmailAction,
  createEmailTemplateAction
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmailFormManagement);
