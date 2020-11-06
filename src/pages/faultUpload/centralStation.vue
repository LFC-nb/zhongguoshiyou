<template>
<div class="hdp-uf main-container hdp-w-100">
  <div class="hdp-uf hdp-uf-dc hdp-w-100">
    <div class="hdp-uf hdp-uf-hsb menu-title hdp-w-100">
      <div class="hdp-uf hdp-uf-dc" style="width:100%;background:#FFFFFF;padding:10px 10px 5px 10px">
        <div class="hdp-uf" style="margin-top:15px;display: inline-block;">
          <div class="hdp-uf" style="width:270px;display: inline;margin-right:15px">
            <template>
              <el-date-picker style="width: 125px;;display: inline-block;"
                v-model="datepickervalue[0]" size="small" @change="datepickerValuechange"
                align="right"
                type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                placeholder="开始日期"
                :picker-options="pickerOptions1">
              </el-date-picker>
              <div class="hdp-uf" style="display: inline-block;">
                <el-col class="line" :span="2" style="text-align: center;width:10px;line-height:16px;">-</el-col>
              </div>
              <el-date-picker style="width: 125px;;display: inline-block;"
                v-model="datepickervalue[1]" size="small" @change="datepickerValuechange"
                align="right"
                type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                placeholder="结束日期"
                :picker-options="pickerOptions1">
              </el-date-picker>
            </template>
          </div>
          <div class="hdp-uf" style="margin:0 15px 5px 0;display: inline-block;">
            <el-cascader expand-trigger="hover" :options="departmentwelllist" :props="departwellcenterProps" v-model="search.selectedwellOptions" @change="getDepartinsearch" change-on-select size="small" placeholder="所属井站" clearable style="width:125px">
            </el-cascader>
          </div>
          <!-- <div class="hdp-uf" style="margin-right:15px">
            <el-select v-model="search.DepartmentId" size="small" @change="getDepartinsearch" placeholder="请选择井站" clearable>
              <el-option v-for="item in departmentwelllist" :key="item.ID" :label="item.DepartmentName" :value="item.ID"></el-option>
            </el-select>
          </div> -->
          <!-- <div class="hdp-uf" style="margin-right:15px">
            <el-select v-model="search.LocationId" size="small" @change="getlocattinform" placeholder="请选择故障位置" clearable>
              <el-option v-for="item in locationlist" :key="item.ID" :label="item.LocationName" :value="item.ID"></el-option>
            </el-select>
          </div> -->
          <div class="hdp-uf" style="margin:0 15px 5px 0;display: inline-block;">
            <el-cascader expand-trigger="hover" :options="questionTypecascader" :props="optionProps" v-model="search.selectedOptions" @change="getquesTypeinsearch" change-on-select size="small" placeholder="问题分类" clearable  style="width:125px">
            </el-cascader>
          </div>
          <div class="hdp-uf" style="margin:0 15px 5px 0;display: inline-block;">
            <el-select v-model="search.DegreeId" size="small" @change="getDegreeinsearch" placeholder="问题分级" clearable  style="width:125px">
              <el-option v-for="item in degreelist" :key="item.ID" :label="item.DegreeName" :value="item.ID"></el-option>
            </el-select>
          </div>
          <div class="hdp-uf" style="margin:0 15px 5px 0;display: inline-block;">
            <el-select v-model="search.CurrentStatus" size="small" @change="handleClick" placeholder="状态" clearable  style="width:125px">
              <el-option key="1" label="待审核" value="1"></el-option>
              <el-option v-if="this.identity.Identity === '96'" key="2" label="驳回" value="2"></el-option>
              <el-option key="3" label="待处理" value="3"></el-option>
              <el-option key="4" label="完成" value="4"></el-option>
            </el-select>
          </div>
          <div class="hdp-uf" style="margin:0 15px 5px 0;display: inline-block;">
            <el-select v-model="search.IsRepeatQst" size="small" placeholder="体系重复" clearable  style="width:125px">
              <el-option key="2" label="全部" value="2"></el-option>
              <el-option key="1" label="是" value="1"></el-option>
              <el-option key="0" label="否" value="0"></el-option>
            </el-select>
          </div>
          <div class="hdp-uf" style="margin:0 15px 5px 0;display: inline-block;">
            <el-date-picker style="width: 125px;"
              v-model="search.LimitTime" size="small"
              align="right"
              type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
              placeholder="整改时限">
            </el-date-picker>
          </div>
          <div class="hdp-uf" style="margin:0 15px 5px 0;display: inline-block;">
            <el-input v-model="search.RepairUserName"  size="small" placeholder="整改负责人" @mousewheel.native.prevent clearable style="width:125px"></el-input>
          </div>
          <div class="hdp-uf" style="margin:0 15px 5px 0;display: inline-block;">
            <el-button @click="getcentralStationlist" size="small" type="primary">查询</el-button>
          </div>
          <div v-if="this.identity.Identity === '96'" class="hdp-uf psc-font-3" style="margin:0 15px 5px 0;display: inline-block;">
            <el-button @click="updateRow('', [])" type="primary" size="small">新增</el-button>
          </div>
          <div v-if="this.identity.Identity === '98' || this.identity.Identity === '97'" class="hdp-uf" style="margin:0 15px 5px 0;display: inline-block;">
            <a target="_self" :href='reportfile' class="el-button el-button--primary el-button--small">
              导出excel</a>
          </div>
        </div>
      </div>
    </div>
    <el-dialog :close-on-click-modal="false" title="驳回" :visible.sync="rejectFormDialogVisible" v-if="rejectFormDialogVisible" @close="rejectviewdetailsclose" width="500px">
      <div class="dialog-content">
        <el-form ref="form" :inline="true" :model="form" label-width="150px">
          <el-form-item label="" prop="" size="small" style="width:350px">
            <el-input type="textarea" :rows="5" placeholder="请输入驳回意见" v-model="form.RejectComments" style="width:460px"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="rejectFormDialogVisible = false;" type="primarydel">取 消</el-button>
        <span class="" style="margin-left: 10px;">
          <el-button size="small" @click="editinfo(2)" type="primary">驳 回</el-button>
        </span>
      </span>
    </el-dialog>
    <el-dialog :close-on-click-modal="false" title="分配" :visible.sync="repairFormDialogVisible" v-if="repairFormDialogVisible" @close="rejectviewdetailsclose" width="650px">
      <div class="dialog-content">
        <el-form ref="form" :inline="true" :model="form" label-width="100px">
          <el-form-item label="问题分级" prop="" style="width: 280px">
            <el-select v-model="form.DegreeId" size="small" @change="getDegreeinform" :disabled="identity.controldisabled" placeholder="请选择">
              <el-option v-for="item in degreelist" :key="item.ID" :label="item.DegreeName" :value="item.ID"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="问题分类" prop="QuestionTypeId" style="width: 280px">
            <el-cascader expand-trigger="hover" :options="questionTypecascader" :props="optionProps" v-model="selectedOptions" :disabled="identity.controldisabled" @change="getquesTypeinform" change-on-select size="small">
            </el-cascader>
          </el-form-item>
          <el-form-item label="调控中心审核人" prop="" style="width: 280px">
            <el-select v-model="form.AuditorId" size="small" @change="getregulateinform" :disabled="identity.controldisabled" placeholder="请选择">
              <el-option v-for="item in regulatelist" :key="item.ID" :label="item.NickName" :value="item.ID"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="整改时限" prop="LimitTime" style="width: 280px">
            <el-date-picker v-model="form.LimitTime" type="date" size="small" :disabled="identity.controldisabled" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期" clearable></el-date-picker>
          </el-form-item>
          <el-form-item label="整改负责人" prop="ShipPlaceId" style="width: 500px">
            <template>
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" :disabled="identity.controldisabled">全选</el-checkbox>
              <div style="margin: 5px 0;"></div>
              <el-checkbox-group v-model="checkedrepair" @change="handlecheckedrepairChange" :disabled="identity.controldisabled" style="width:500px">
                <el-checkbox v-for="repair in repairUserlist" :label="repair.ID" :key="repair.ID">{{repair.NickName}}</el-checkbox>
              </el-checkbox-group>
            </template>
          </el-form-item>
          <el-form-item v-if="this.form.IsWellDo === '0'" label="整改措施" prop="Description" size="small" style="width:500px">
            <el-input type="textarea" :rows="3" v-model="form.Result" :disabled="identity.controldisabled" @mousewheel.native.prevent style="width:470px"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="repairFormDialogVisible = false;" type="primarydel">取 消</el-button>
        <span class="" style="margin-left: 10px;">
          <el-button size="small" @click="editinfo(3)" type="primary">提 交</el-button>
        </span>
      </span>
    </el-dialog>
    <el-dialog :close-on-click-modal="false" title="审核" :visible.sync="regulateFormDialogVisible" v-if="regulateFormDialogVisible" @close="rejectviewdetailsclose" width="650px">
      <div class="dialog-content">
        <el-form ref="form" :inline="true" :model="form" label-width="100px">
          <el-form-item label="问题分级" prop="" style="width: 280px">
            <el-select v-model="form.DegreeId" size="small" @change="getDegreeinform" :disabled="identity.controldisabled" placeholder="请选择">
              <el-option v-for="item in degreelist" :key="item.ID" :label="item.DegreeName" :value="item.ID"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="问题分类" prop="QuestionTypeId" style="width: 280px">
            <el-cascader expand-trigger="hover" :options="questionTypecascader" :props="optionProps" v-model="selectedOptions" :disabled="identity.controldisabled" @change="getquesTypeinform" change-on-select size="small">
            </el-cascader>
          </el-form-item>
          <el-form-item label="调控中心审核人" prop="" style="width: 280px">
            <el-select v-model="form.AuditorId" size="small" @change="getregulateinform" :disabled="identity.controldisabled" placeholder="请选择">
              <el-option v-for="item in regulatelist" :key="item.ID" :label="item.NickName" :value="item.ID"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="整改时限" prop="LimitTime" style="width: 280px">
            <el-date-picker v-model="form.LimitTime" type="date" size="small" :disabled="identity.controldisabled" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期">></el-date-picker>
          </el-form-item>
          <el-form-item label="完成图片" prop="ImagePath" size="small" style="width:600px">
            <el-upload style="width:600px" :file-list="ImagePathlist2" :disabled="identity.centraldisabled"
              :action="uploadip" :limit="3" list-type="picture-card"
              :on-preview="handlePictureCardPreview" :on-remove="handleRemove2"
              :on-exceed="handleExceed2"
              :on-success="handleSuccess2" :on-error="handleError2">
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="regulateFormDialogVisible = false;" type="primarydel">取 消</el-button>
        <span class="" style="margin-left: 10px;">
          <el-button size="small" @click="editinfo(4)" type="primary">完成审核</el-button>
        </span>
      </span>
    </el-dialog>
    <el-dialog :close-on-click-modal="false" title="闭环" :visible.sync="ResultFormDialogVisible" v-if="ResultFormDialogVisible" @close="Resultviewdetailsclose" width="600px">
      <div class="dialog-content">
        <el-form ref="form" :inline="true" :model="form" label-width="60px">
          <el-form-item v-if="isResult" label="问题分级" prop="" style="width: 250px">
            <el-select v-model="form.DegreeId" size="small" @change="getDegreeinform" :disabled="identity.controldisabled" placeholder="请选择">
              <el-option v-for="item in degreelist" :key="item.ID" :label="item.DegreeName" :value="item.ID"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="isResult" label="问题分类" prop="QuestionTypeId" style="width: 250px">
            <el-cascader expand-trigger="hover" :options="questionTypecascader" :props="optionProps" v-model="selectedOptions" :disabled="identity.controldisabled" @change="getquesTypeinform" change-on-select size="small">
            </el-cascader>
          </el-form-item>
          <el-form-item label="完成图片" prop="ImagePath" size="small" style="width:600px">
            <el-upload style="width:600px" :file-list="ImagePathlist2" :disabled="identity.centraldisabled"
              :action="uploadip" :limit="3" list-type="picture-card"
              :on-preview="handlePictureCardPreview" :on-remove="handleRemove2" :on-exceed="handleExceed2"
              :on-success="handleSuccess2" :on-error="handleError2">
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="整改措施" prop="Description" size="small" style="width:460px">
            <el-input type="textarea" :rows="5" v-model="form.Result" @mousewheel.native.prevent style="width:440px"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="Resultviewdetailsclose" type="primarydel">取 消</el-button>
        <span class="" style="margin-left: 10px;">
          <el-button size="small" @click="editinfo(4)" type="primary">完成审核</el-button>
        </span>
      </span>
    </el-dialog>
    <el-dialog :close-on-click-modal="false" title="编辑" :visible.sync="centralStationFormDialogVisible" style="z-index: 2021" v-if="centralStationFormDialogVisible" @close="viewdetailsclose" width="800px">
      <div class="dialog-content">
        <el-form ref="form" :inline="true" :model="form" label-width="150px">
          <el-form-item v-if="this.identity.Identity !== '96'"  label="体系审核重复" prop="IsRepeatQst" size="small" style="width:350px">
            <el-radio v-model="form.IsRepeatQst" :disabled="identity.centraldisabled" label="1" style="margin-left:10px">是</el-radio>
            <el-radio v-model="form.IsRepeatQst" :disabled="identity.centraldisabled" label="0">否</el-radio>
          </el-form-item>
          <el-form-item label="是否自行整改" prop="IsWellDo" size="small" style="width:350px">
            <el-radio v-model="form.IsWellDo" :disabled="identity.centraldisabled" label="1" style="margin-left:10px">是</el-radio>
            <el-radio v-model="form.IsWellDo" :disabled="identity.centraldisabled" label="0">否</el-radio>
          </el-form-item>
          <el-form-item label="井站" prop="ShipPlaceId" style="width: 350px">
            <el-select v-model="form.DepartmentId" size="small" @change="getDepartinform" :disabled="identity.centraldisabled" placeholder="请选择">
              <el-option v-for="item in departmentlist" :key="item.ID" :label="item.DepartmentName" :value="item.ID"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="日期" prop="Date" style="width: 350px">
            <el-date-picker v-model="form.Date" type="date" size="small" :disabled="identity.centraldisabled" :picker-options="pickerOptions1" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期">></el-date-picker>
          </el-form-item>
          <el-form-item label="上报人员" prop="UserName" size="small" style="width:350px">
            <el-input v-model="form.UserName" :disabled="identity.centraldisabled" @mousewheel.native.prevent></el-input>
          </el-form-item>
          <el-form-item label="审核人员" prop="SubmitterName" size="small" style="width:350px">
            <el-input v-model="form.SubmitterName" :disabled="identity.centraldisabled" @mousewheel.native.prevent></el-input>
          </el-form-item>
          <el-form-item v-if="this.form.Status >= 3" label="调控中心审核人" prop="" style="width: 350px">
            <el-select v-model="form.AuditorId" size="small" @change="getregulateinform" :disabled="identity.controldisabled" placeholder="请选择">
              <el-option v-for="item in regulatelist" :key="item.ID" :label="item.NickName" :value="item.ID"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="故障区域" prop="ShipPlaceId" style="width: 350px">
            <el-select v-model="form.LocationId" size="small" @change="getlocattinform" :disabled="identity.centraldisabled" placeholder="请选择">
              <el-option v-for="item in locationlist" :key="item.ID" :label="item.LocationName" :value="item.ID"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="this.form.Status !== '' && this.form.Status !== 0 && this.form.Status !== 1 && this.form.Status !== 0 && this.form.Status !== 0 && this.form.Status !== 2" label="问题分级" prop="" style="width: 350px">
            <!-- <el-select v-if="this.form.Status === 3" v-model="form.DegreeId" size="small" @change="getDegreeinform" disabled placeholder="请选择">
              <el-option v-for="item in degreelist" :key="item.ID" :label="item.DegreeName" :value="item.ID"></el-option>
            </el-select> -->
            <el-select v-model="form.DegreeId" size="small" @change="getDegreeinform" :disabled="identity.controldisabled" placeholder="请选择">
              <el-option v-for="item in degreelist" :key="item.ID" :label="item.DegreeName" :value="item.ID"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="this.form.Status !== '' && this.form.Status !== 0 && this.form.Status !== 1 && this.form.Status !== 2" label="问题分类" prop="QuestionTypeId" style="width: 350px">
            <!-- <el-cascader v-if="this.form.Status === 3" expand-trigger="hover" :options="questionTypecascader" :props="optionProps" v-model="selectedOptions" disabled @change="getquesTypeinform" change-on-select size="small">
            </el-cascader> -->
            <el-cascader expand-trigger="hover" :options="questionTypecascader" :props="optionProps" v-model="selectedOptions" :disabled="identity.controldisabled" @change="getquesTypeinform" change-on-select size="small">
            </el-cascader>
          </el-form-item>
          <el-form-item v-if="this.form.Status >= 3" label="整改时限" prop="LimitTime" style="width: 350px">
            <el-date-picker v-model="form.LimitTime" type="date" size="small" :disabled="identity.controldisabled" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期" clearable></el-date-picker>
          </el-form-item>
          <el-form-item label="故障图片" prop="ImagePath" size="small" style="width:700px">
            <!-- <el-upload class="avatar-uploader"
            :action="uploadip" :show-file-list="false"
            :on-success="handlesuccess"
            :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload> -->
            <el-upload style="width:700px" :file-list="ImagePathlist" :disabled="identity.centraldisabled"
              :action="uploadip" :limit="5" list-type="picture-card"
              :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-exceed="handleExceed"
              :on-success="handleSuccess" :on-error="handleError">
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="问题描述" prop="Description" size="small" style="width:700px">
            <el-input type="textarea" :rows="3" v-model="form.Description" :disabled="identity.centraldisabled" @mousewheel.native.prevent style="width:538px"></el-input>
          </el-form-item>
          <el-form-item v-if="this.form.IsWellDo === '0'" label="初步分析" prop="Description" size="small" style="width:700px">
            <el-input type="textarea" :rows="3" v-model="form.Comments" :disabled="identity.centraldisabled" @mousewheel.native.prevent style="width:538px"></el-input>
          </el-form-item>
          <el-form-item v-if="this.form.IsWellDo === '1' || this.form.Status === 3" label="整改措施" prop="Description" size="small" style="width:700px">
            <el-input type="textarea" :rows="3" v-model="form.Result" :disabled="identity.centraldisabled" @mousewheel.native.prevent style="width:538px"></el-input>
          </el-form-item>
          <!-- <el-form-item label="驳回意见" prop="Description" size="small" style="width:1050px">
            <el-input type="textarea" :rows="3" v-model="form.RejectComments" @mousewheel.native.prevent style="width:538px"></el-input>
          </el-form-item> -->
          <el-form-item v-if="this.form.Status === 2" label="驳回意见" prop="" size="small" style="width:700px">
            <el-input type="textarea" :rows="3" :disabled="identity.controldisabled" v-model="form.RejectComments" style="width:538px" placeholder=""></el-input>
          </el-form-item>
          <el-form-item v-if="this.form.IsWellDo === '1'" label="整改负责人" prop="ShipPlaceId" style="width: 700px">
            <div style="width:620px">
              <el-button v-for="repair in tagrepair" :label="repair.ID" :key="repair.ID" size="small" style="padding: 10px 10px;border: 1px solid rgba(64,158,255,.2);color: #409EFF;background-color: rgba(64,158,255,.1);">{{repair.UserName ? repair.UserName : repair.NickName}}</el-button>
              <el-button v-if="this.identity.Identity === '96' && this.form.Status !== 2 && this.form.Status !== 3 && this.form.Status !== 4" @click="IsWellDo1dialogVisibleshow" size="small" style="padding: 10px;border: 1px solid rgba(64,158,255,.2);color: #409EFF;background-color: rgba(64,158,255,.1);">
                <i class="el-icon-plus" style="font-size: 12px;"></i></el-button>
              <!-- <el-tag v-for="repair in tagrepair" @click="IsWellDo1dialogVisible = true" :label="repair.ID" :key="repair.ID">{{repair.UserName ? repair.UserName : repair.NickName}}</el-tag> -->
            </div>
          </el-form-item>
          <el-form-item v-if="this.form.IsWellDo === '0' && (this.form.Status === 3 || this.form.Status === 4) && this.checkedrepair.length > 0" label="整改负责人" prop="ShipPlaceId" style="width: 700px">
            <!-- <template >
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
              <div style="margin: 5px 0;"></div>
              <el-checkbox-group v-model="checkedrepair" @change="handlecheckedrepairChange" style="width:650px">
                <el-checkbox v-for="repair in repairUserlist" :label="repair.ID" :key="repair.ID">{{repair.NickName}}</el-checkbox>
              </el-checkbox-group>
            </template> -->
            <div style="width:620px">
              <el-button v-for="repair in tagrepair" @click="eltagdialogVisible = true" :label="repair.ID" :key="repair.ID" size="small" style="padding: 10px 10px;border: 1px solid rgba(64,158,255,.2);color: #409EFF;background-color: rgba(64,158,255,.1);">{{repair.UserName ? repair.UserName : repair.NickName}}</el-button>
              <!-- <el-tag v-for="repair in tagrepair" @click="eltagdialogVisible = true" :label="repair.ID" :key="repair.ID">{{repair.UserName ? repair.UserName : repair.NickName}}</el-tag> -->
            </div>
          </el-form-item>
          <el-form-item v-if="this.form.Status === 3 || (this.form.IsWellDo === '0' && this.form.Status === 4)" label="整改进度" prop="Progress" size="small" style="width:700px">
            <el-input type="textarea" :rows="3" v-model="form.Progress" :disabled="identity.centraldisabled" @mousewheel.native.prevent style="width:538px"></el-input>
          </el-form-item>
          <el-form-item v-if="(this.form.Status === 4)" label="完成图片" prop="ImagePath" size="small" style="width:600px">
            <el-upload style="width:600px" :file-list="ImagePathlist2" :disabled="identity.centraldisabled"
              :action="uploadip" :limit="3" list-type="picture-card"
              :on-preview="handlePictureCardPreview" :on-remove="handleRemove2" :on-exceed="handleExceed2"
              :on-success="handleSuccess2" :on-error="handleError2">
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
          <el-form-item v-if="this.form.Status === 4 && this.form.IsWellDo === '0'" label="整改措施" prop="Description" size="small" style="width:700px">
            <el-input type="textarea" :rows="3" v-model="form.Result" :disabled="identity.controldisabled" @mousewheel.native.prevent style="width:538px"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <!-- <div class="" style="text-align:center;color:#FF6D18;font-size:11px;position: absolute;bottom: 18px;right:600px">* 严格按照运单进行填写 *</div> -->
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="viewdetailsclose" type="primarydel">取 消</el-button>
        <span  class="" style="margin-left: 10px;">
          <el-button v-if="this.identity.Identity === '96' && (this.form.Status === 0 || this.form.Status === '')" size="small" @click="editinfo(0)" type="primary">保 存</el-button>
          <el-button v-if="this.identity.Identity === '96' && this.form.Status !== 1 && this.form.Status !== 3 && this.form.Status !== 4" size="small" @click="editinfo(1)" type="primary">提 交</el-button>
          <el-button v-if="this.identity.Identity === '97' && this.form.Status === 1" size="small" @click="reject(2)" type="primary">驳 回</el-button>
          <el-button v-if="this.identity.Identity === '97' && this.form.Status === 1 && this.form.IsWellDo !== '1' " size="small" @click="repair(3)" type="primary">审 核</el-button>
          <el-button v-if="this.identity.Identity === '97' && this.form.Status !== 4 && this.form.Status !== 2 && this.form.IsWellDo === '1'" size="small" @click="regulate(3)" type="primary">审 核</el-button>
          <el-button v-if="this.identity.Identity === '97' && this.form.Status === 3" size="small" @click="editinfo(3)" type="primary">保 存</el-button>
          <el-button v-if="this.identity.Identity === '97' && this.form.Status === 3 && this.form.IsWellDo === '0'" size="small" @click="Result(4)" type="primary">审 核</el-button>
          <el-button v-if="this.identity.Identity === '97' && this.form.Status === 4" size="small" @click="editinfo(4)" type="primary">保 存</el-button>
        </span>
      </span>
    </el-dialog>
    <el-dialog :close-on-click-modal="false" :visible.sync="eltagdialogVisible" v-if="eltagdialogVisible" @close="eltagdialogclose" width="800px"  :modal-append-to-body='false'>
      <el-form ref="form" :inline="true" :model="form" label-width="150px">
        <el-form-item v-if="(this.form.Status === 3 || this.form.Status === 4) && this.checkedrepair.length > 0" label="整改负责人" prop="ShipPlaceId" style="width: 700px">
          <template >
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            <div style="margin: 5px 0;"></div>
            <el-checkbox-group v-model="checkedrepair" @change="handlecheckedrepairChange" style="width:650px">
              <el-checkbox v-for="repair in repairUserlist" :label="repair.ID" :key="repair.ID">{{repair.NickName}}</el-checkbox>
            </el-checkbox-group>
          </template>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="eltagdialogVisible = false" type="primarydel">取 消</el-button>
        <span  class="" style="margin-left: 10px;">
          <el-button size="small" @click="eltagdialogVisible = false" type="primary">确 定</el-button>
        </span>
      </span>
    </el-dialog>
    <el-dialog :close-on-click-modal="false" :visible.sync="dialogVisible" v-if="dialogVisible" @close="imageUrlclose" width="800px"  :modal-append-to-body='false'>
      <img width="100%" :src="imageUrl" alt="">
    </el-dialog>
    <el-dialog :close-on-click-modal="false" title="负责人" :visible.sync="IsWellDo1dialogVisible" v-if="IsWellDo1dialogVisible" @close="IsWellDo1dialogclose" width="800px"  :modal-append-to-body='false'>
      <div class="hdp-uf">
        <div class="hdp-uf" style="width:100px">
          <div class="hdp-uf hdp-uf-dc">
            <el-tag v-for="repair in IsWellDo1dialog.tagrepair" @close="handleClose(repair.UserId)"
               :label="repair.ID" :key="repair.ID" size="small" closable
               style="display:block;float:left; text-align:right;margin: 5px;border: 1px solid rgba(64,158,255,.2);color: #409EFF;background-color: rgba(64,158,255,.1);">
               {{repair.UserName ? repair.UserName : repair.NickName}}</el-tag>
          </div>
        </div>
        <div class="hdp-uf" style="background-color:#dcdfe6;width:2px;margin:0 10px"></div>
        <div class="hdp-uf hdp-uf-dc">
          <div class="hdp-uf">
            <div class="hdp-uf" style="margin:0 0px 5px 0;display: inline-block;">
              <el-cascader expand-trigger="hover" :options="departRepairlist" :props="departwellcenterProps" v-model="IsWellDo1dialog.selectedwellOptions" @change="getDepartIsWellDo1dialog" change-on-select size="small" placeholder="部门" clearable style="width:125px">
              </el-cascader>
            </div>
            <div class="hdp-uf" style="margin:0 0px 5px 10px;display: inline-block;">
              <el-input v-model="IsWellDo1dialog.RepairUserName"  size="small" placeholder="整改负责人" @mousewheel.native.prevent clearable style="width:125px"></el-input>
            </div>
            <div class="hdp-uf" style="margin:0 0px 5px 10px;display: inline-block;">
              <el-button @click="getALLUsers" size="small" type="primary">查询</el-button>
            </div>
          </div>
          <div id='repairDiv' class="hdp-uf" style="height:300px;overflow: auto;margin-top:5px">
            <el-form ref="form" :inline="true" :model="form" label-width="10px">
              <el-form-item v-if="this.form.IsWellDo === '1'" label="" prop="ShipPlaceId" style="width: 600px">
                <template >
                  <el-checkbox-group v-model="checkedrepair" @change="handlecheckedIsWellDo1" :max="3" style="width:600px">
                    <el-checkbox v-for="repair in IsWellDo1dialog.Userlist" :label="repair.ID" :key="repair.ID">{{repair.NickName}}</el-checkbox>
                  </el-checkbox-group>
                </template>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <div class="" style="text-align:center;color:#FF6D18;font-size:11px;position: absolute;bottom: 18px;right:300px">* 整改人员最多只允许选择三人 *</div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="IsWellDo1dialogclose" type="primarydel">取 消</el-button>
        <span  class="" style="margin-left: 10px;">
          <el-button size="small" @click="IsWellDo1dialogSure" type="primary">确 定</el-button>
        </span>
      </span>
    </el-dialog>
    <div id="tableDiv" class="hdp-uf hdp-w-100 hdp-uf-dc" style="background:#FFFFFF;margin-top:20px;padding:10px">
      <!-- <template v-if="this.identity.Identity === '97'" >
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="全部" name="1"></el-tab-pane>
          <el-tab-pane label="未完成" name="2"></el-tab-pane>
        </el-tabs>
      </template> -->
      <div class="hdp-uf hdp-w-100" style="margin-top:10px">
        <el-table :data="centralStationlist" stripe border>
          <el-table-column prop="DepartmentName" label="所属井站" width="120">
          </el-table-column>
          <el-table-column prop="UserName" label="上报人员" width="80">
          </el-table-column>
          <el-table-column prop="Date" label="上报时间" width="100">
            <template slot-scope="scope">
              <span>{{scope.row.Date.substr(0,10)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="Description" label="问题描述" width="160">
            <template slot-scope="scope" style="width:100%">
              <el-popover :content="scope.row.Description" placement="top-start" title="" trigger="hover">
                <span class="sptitle" slot="reference">{{scope.row.Description}}</span>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="IsRepeatQst" label="体系重复" width="75">
            <template slot-scope="scope">
              <span v-if="scope.row.IsRepeatQst === 1 && scope.row.Status !== 0 && scope.row.Status !== 1 && scope.row.Status !== 0" style="color:#FF6D18">是</span>
              <span v-else-if="scope.row.IsRepeatQst === 0 && scope.row.Status !== 0 && scope.row.Status !== 1" style="color:#67c23a">否</span>
            </template>
          </el-table-column>
          <el-table-column prop="DegreeName" label="问题分级" width="80">
            <template slot-scope="scope" style="width:100%">
              <el-popover :content="scope.row.DegreeName" placement="top-start" title="" trigger="hover">
                <span class="sptitle" slot="reference">{{scope.row.DegreeName}}</span>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="QuestionTypeName" label="问题分类" width="80">
          </el-table-column>
          <el-table-column prop="SubmitterName" label="中心站(审)" width="90">
          </el-table-column>
          <el-table-column prop="AuditorName" label="调控中心(审)" width="90">
          </el-table-column>
          <el-table-column prop="RepairUser" label="整改负责人" width="90">
            <template slot-scope="scope">
              <span v-if="scope.row. IsWellDo === 1">
                <el-popover v-if="scope.row.RepairUser.length > 0" :content="(scope.row.RepairUser.map((item,n)=>{return item.UserName})).join('、')" placement="top-start" title="" trigger="hover">
                  <span class="sptitle" slot="reference">{{(scope.row.RepairUser.map((item,n)=>{return item.UserName})).join('、')}}</span>
                </el-popover>
                <span v-else>自行整改</span>
              </span>
              <el-popover v-else :content="(scope.row.RepairUser.map((item,n)=>{return item.UserName})).join('、')" placement="top-start" title="" trigger="hover">
                <span class="sptitle" slot="reference">{{(scope.row.RepairUser.map((item,n)=>{return item.UserName})).join('、')}}</span>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="LimitTime" label="整改时限" width="100">
            <template v-if="scope.row.Status >= 3" slot-scope="scope">
              <span>{{scope.row.LimitTime.substr(0,10)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="FinishTime" label="处置时间" width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.Status === 4">{{scope.row.FinishTime.substr(0,10) + ' ' + scope.row.FinishTime.substr(11,5)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="Result" label="整改措施" width="160">
            <template slot-scope="scope" style="width:100%">
              <el-popover :content="scope.row.Result" placement="top-start" title="" trigger="hover">
                <span class="sptitle" slot="reference">{{scope.row.Result}}</span>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="Status" label="状态" width="65">
            <template slot-scope="scope">
              <span v-if="scope.row.Status === 1" style="color:#FF6D18">待审核</span>
              <!-- <span v-if="scope.row.Status === 1 && scope.row.IsWellDo === 0" style="color:#FF6D18">待分配</span> -->
              <span v-else-if="scope.row.Status === 0" >待提交</span>
              <span v-else-if="scope.row.Status === 2" style="color:#f56c6c">已驳回</span>
              <span v-else-if="scope.row.Status === 3" style="color:#409EFF">待处理</span>
              <span v-else-if="scope.row.Status === 4" style="color:#67c23a">已完成</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button v-if="((identity.Identity === '96' && scope.row.Status !== 2 && scope.row.Status !== 0)
               || (identity.Identity === '98' &&  scope.row.Status === 4))" @click.native.prevent="viewdetails(scope.row.Status, scope.$index, centralStationlist)" type="primarydel" size="small">
                查看
              </el-button>
              <el-button v-if="(identity.Identity === '97'
              &&  (scope.row.Status === 4 || scope.row.Status === 2)) || (identity.Identity === '98' && scope.row.Status !== 0 && scope.row.Status !== 4)" @click.native.prevent="viewdetails98(scope.row.Status, scope.$index, centralStationlist)" type="primarydel" size="small">
                查看
              </el-button>
              <el-button v-if="(identity.Identity === '96' && (scope.row.Status === 0 || scope.row.Status === 2))" @click.native.prevent="updateRow(scope.$index, centralStationlist)" type="primary" size="small">
                编辑
              </el-button>
              <el-button v-if="(identity.Identity === '97' && scope.row.Status === 3)" @click.native.prevent="updateRow(scope.$index, centralStationlist)" type="primary" size="small">
                处理
              </el-button>
              <!-- <el-button v-if="identity.Identity === '97' && scope.row.Status === 1 && scope.row.IsWellDo === 0" @click.native.prevent="updateRow(scope.$index, centralStationlist)" type="primary" size="small">
                处理
              </el-button> -->
              <el-button v-if="identity.Identity === '97' && scope.row.Status === 1" @click.native.prevent="updateRow(scope.$index, centralStationlist)" type="primary" size="small">
                审核
              </el-button>
              <!-- <el-button v-if="identity.Identity === '98' && scope.row.Status === 4" @click.native.prevent="updateRow(scope.$index, centralStationlist)" type="primary" size="small">
                编辑
              </el-button> -->
              <el-button v-if="identity.Identity === '96' && (scope.row.Status === 2 || scope.row.Status === 0)" @click.native.prevent="deleteRow(scope.$index, centralStationlist)" type="primarydel" size="small">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="hdp-uf hdp-w-90" style="margin-top:15px">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagination.currentPage" :page-sizes="pagination.pagesizes" :page-size="pagination.pagesize" layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.totalNum">
        </el-pagination>
      </div>
    </div>
  </div>

</div>
</template>
<script>
import {
  mapGetters
} from 'vuex'
import config from '../../config/config.js'
import commonFunc from '../../api/common/common.js'
import centralStationApi from '../../api/centralStation.js'
import departmentApi from '../../api/department.js'
import locationApi from '../../api/location.js'
import questionTypeApi from '../../api/questionType.js'
import degreeApi from '../../api/degree.js'
import regulateApi from '../../api/regulate.js'
export default {
  data() {
    return {
      currentMenuLeadListsData: [{
        'name': this.$route.query.name,
        'code': this.$route.query.code,
        'url': '/#' + this.$route.query.link
      }, {
        'name': this.$route.query.itemname,
        'code': this.$route.query.code,
        'url': '/#' + this.$route.query.link
      }],
      title: {
        firstTitle: this.$route.query.itemname
      },
      filepdf: config.APISERVER.filepdf,
      reportfile: '',
      uploadip: config.APISERVER.uploadip,
      imageip: config.APISERVER.ip,
      imageUrl: '',
      ImagePathlist: [],
      ImagePathlist2: [],
      dialogVisible: false,
      datepickervalue: [commonFunc.getnowDate(new Date(), -30), commonFunc.getnowDate(new Date(), 0)], // 时间段选择
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      rejectFormDialogVisible: false,
      repairFormDialogVisible: false,
      regulateFormDialogVisible: false,
      ResultFormDialogVisible: false,
      eltagdialogVisible: false,
      IsWellDo1dialogVisible: false,
      centralStationFormDialogVisible: false,
      search: {
        'selectedwellOptions': [],
        'DepartmentId': '', // 部门id
        'DepartmentLev': '', // 部门层级
        'DepartmentName': '', // 部门名称
        'DegreeId': '', // 问题级别id
        'CurrentStatus': '',
        'IsRepeatQst': '',
        'LimitTime': '',
        'RepairUserName': '',
        'selectedOptions': [],
        'QuestionTypeId': '', // 问题类别
        'QuestionTypeLev': '', // 问题类别层级
        'QuestionTypeName': '' // 问题名称
      },
      form: {
        'ID': '', // 为空新增不为空修改
        'IsRepeatQst': '0', // 是否重复性问题
        'IsWellDo': '0', // 是否自行整改
        'DepartmentId': '', // 部门id
        'DepartmentLev': '', // 部门层级
        'DepartmentName': '', // 部门名称
        'UserId': '0', // 用户id
        'UserName': '', // 用户名称
        'SubmitterName': '', // 中心站审核人员
        'Date': new Date(), // 日期
        'AuditorId': '', // 调控中心审核人员
        'AuditorName': '', // 调控中心审核人员
        'LimitTime': new Date(), // 整改时限
        'LocationId': '', // 故障位置id
        'LocationName': '', // 故障位置说明
        'QuestionTypeId': '', // 问题类别
        'QuestionTypeLev': '', // 问题类别层级
        'QuestionTypeName': '', // 问题名称
        'DegreeId': '', // 问题级别id
        'DegreeName': '', // 问题级别说明
        'Description': '', // 描述
        'ImagePath': '', // 图片
        'FinishImgPath': '', // 完成图片
        'Comments': '', // 初步分析结果
        'Progress': '', // 整改进度Progress
        'RejectComments': '', // 驳回时意见
        'Result': '', // 最后处理结果
        'Status': '', // 状态（0待提交1待处理2驳回3已分配4完成）
        'RepairUser': []
      },
      departmentlist: [],
      locationlist: [],
      departmentwelllist: [],
      departwellcenterProps: {
        expandTrigger: 'hover',
        value: 'ID', // value="ParentID"
        label: 'DepartmentName',
        children: 'SubDeps'
      },
      departwellcenterlist: [],

      departRepairlist: [],
      departRepaircenterlist: [],

      questionTypecascader: [],
      selectedOptions: [],
      optionProps: {
        expandTrigger: 'hover',
        value: 'ID', // value="ParentID"
        label: 'TypeName',
        children: 'SubNodes'
      },
      questionTypelist: [],
      identity: {
        Identity: '96',
        centraldisabled: false,
        controldisabled: true
      },
      degreelist: [],
      regulatelist: [],
      repairUserlist: [],
      centralStationlist: [],
      checkAll: false,
      isIndeterminate: false,

      IsWellDo1dialog: {
        'RepairUserName': '',
        'Useralllist': [],
        'Userlist': [],
        'checkedrepair': [],
        'tagrepair': [],
        'selectedwellOptions': [],
        'DepartmentId': '', // 部门id
        'DepartmentLev': '', // 部门层级
        'DepartmentName': '' // 部门名称
      },
      departOptions2: [],
      checkedrepair: [],
      tagrepair: [],
      activeName: '1',
      isResult: false,
      pagination: {
        totalNum: 0,
        currentPage: 1,
        pagesizes: [5, 8, 10, 20],
        pagesize: 10
      }
    }
  },
  computed: {
    ...mapGetters({
      resMembersDataArr: 'members/GET_RES_DATA_ARR'
    })
  },
  mounted() { // el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子
    this.$commonFunc.myConsole('mounted ======> members')
    document.title = this.title.firstTitle
    this.init()
  },
  methods: {
    handlesuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      this.form.ImagePath = file.response.url
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    handleRemove(file, fileList) {
      commonFunc.myConsole(fileList)
      this.getImagePathinform(fileList)
    },
    handleError(err, file, fileList) {
      commonFunc.myConsole(err)
    },
    handleSuccess(response, file, fileList) {
      this.getImagePathinform(fileList)
    },

    handleRemove2(file, fileList) {
      commonFunc.myConsole(fileList)
      this.getImagePathinform2(fileList)
    },
    handleError2(err, file, fileList) {
      commonFunc.myConsole(err)
    },
    handleSuccess2(response, file, fileList) {
      this.getImagePathinform2(fileList)
    },
    handleExceed(file, fileList) {
      // commonFunc.myConsole(file)
      this.$message.warning('最多选择5张照片')
    },
    handleExceed2(file, fileList) {
      // commonFunc.myConsole(file)
      this.$message.warning('最多选择3张照片')
    },
    handlePictureCardPreview(file) {
      this.imageUrl = file.url
      this.dialogVisible = true
    },
    async init() {
      this.$commonFunc.myConsole('渲染完成后 ===> 开始默认加载相应的逻辑')
      if (commonFunc.isDefine(this.$route.query.link)) {
        localStorage.setItem('currentMenuLeadListsData', JSON.stringify(this.currentMenuLeadListsData))
        this.identity.Identity = this.currentMenuLeadListsData[this.currentMenuLeadListsData.length - 1].code
      } else {
        this.currentMenuLeadListsData = JSON.parse(localStorage.getItem('currentMenuLeadListsData'))
        this.title.firstTitle = this.currentMenuLeadListsData[this.currentMenuLeadListsData.length - 1].name
        this.identity.Identity = this.currentMenuLeadListsData[this.currentMenuLeadListsData.length - 1].code
        document.title = this.title.firstTitle
      }
      this.$store.dispatch('menuLeadLists/setMenuLeadListsData', this.currentMenuLeadListsData)
      this.getdepartmentlist()
      this.getdepartRepairlist()
      this.getdepartmentwelllist()
      this.getlocation()
      this.getdegree()
      this.getregulate()
      this.getquestionTypelist()
      this.getUsers()
      this.getALLUsers()
      this.getcentralStationlist()
      this.assemblelinks()
      this.identitydisabled()
    },
    editinfo(Status) {
      let jsonArr = []
      this.form.RepairUser = []
      let that = this
      if (this.form.IsWellDo === '1') {
        jsonArr = this.IsWellDo1dialog.Useralllist // this.IsWellDo1dialog.Userlist
      } else {
        jsonArr = this.repairUserlist
      }
      this.checkedrepair.forEach(function(value) {
        let obj = jsonArr.find(function(item) {
          return item.ID === value
        })
        let obj2 = {
          'UserId': obj.ID,
          'UserName': obj.NickName
        }
        that.form.RepairUser.push(obj2)
      })
      if (this.identity.Identity === '96') {
        if (!this.form.DepartmentId) {
          this.$message.warning('请选择井站')
          return
        }
        if (!this.form.Date) {
          this.$message.warning('请选择日期')
          return
        }
      }
      if (this.identity.Identity === '96' && Status !== 0) {
        if (!this.form.UserName) {
          this.$message.warning('请输入问题上报人')
          return
        }
        if (!this.form.SubmitterName) {
          this.$message.warning('请输入中心站审核人员')
          return
        }
        if (this.form.LocationId === '') {
          this.$message.warning('请选择故障区域')
          return
        }
        if (!this.form.Description) {
          this.$message.warning('请输入问题描述')
          return
        }
      }
      if (this.identity.Identity === '96' && !this.form.Result && Status !== 0 && this.form.IsWellDo === '1') {
        this.$message.warning('请输入自行整改措施')
        return
      }
      if (this.identity.Identity === '97' && (Status === 3 || Status === 4)) {
        if (this.form.DegreeId === '') {
          this.$message.warning('请选择问题分级')
          return
        }
        if (this.form.QuestionTypeId === '') {
          this.$message.warning('请选择故障分类')
          return
        }
        if (this.form.AuditorId === '') {
          this.$message.warning('请输入调控中心审核人员')
          return
        }
        if (this.form.LimitTime === '') {
          this.$message.warning('请选择整改时限')
          return
        }
        if (this.form.Result === '' && this.repairFormDialogVisible) {
          this.$message.warning('请输入整改措施')
          return
        }
      }
      if (this.identity.Identity === '97' && Status === 4) {
        if (this.form.AuditorId === '') {
          this.$message.warning('请输入调控中心审核人员')
          return
        }
        if (this.form.LimitTime === '') {
          this.$message.warning('请选择整改时限')
          return
        }
      }
      if (this.identity.Identity === '97' && !this.form.RejectComments && Status === 2) {
        this.$message.warning('请输入驳回意见')
        return
      }
      commonFunc.myConsole(this.form.RepairUser)
      if (this.identity.Identity === '97' && this.form.RepairUser.length === 0 && Status === 3) {
        this.$message.warning('请分配整改负责人')
        return
      }
      if (this.identity.Identity === '97' && this.form.IsWellDo === '1' && Status === 4) {
        if (this.form.AuditorId === '') {
          this.$message.warning('请输入调控中心审核人员')
          return
        }
        if (this.form.LimitTime === '') {
          this.$message.warning('请选择整改时限')
          return
        }
      }
      if (this.identity.Identity === '97' && !this.form.Result && Status === 4) {
        this.$message.warning('请输入处理结果')
        return
      }
      this.$confirm('是否确认操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.Questionsub(Status)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    async Questionsub(Status) {
      let conditionsParams = {

        'ID': this.form.ID, // 为空新增不为空修改
        'IsRepeatQst': this.form.IsRepeatQst, // 是否是为体系审核重复性问题
        'IsWellDo': this.form.IsWellDo, // 是否自行整改
        'DepartmentId': this.form.DepartmentId, // 部门id
        'DepartmentLev': this.form.DepartmentLev, // 部门层级
        'DepartmentName': this.form.DepartmentName, // 部门名称
        'UserId': this.form.UserId, // 用户id
        'UserName': this.form.UserName, // 用户名称
        'SubmitterName': this.form.SubmitterName, // 中心站审核人员
        'Date': this.form.Date, // 日期
        'AuditorId': this.form.AuditorId ? this.form.AuditorId : 0, // 调控中心审核人员
        'AuditorName': this.form.AuditorName, // 调控中心审核人员
        'LimitTime': this.form.LimitTime, // 时限
        'LocationId': this.form.LocationId ? this.form.LocationId : 0, // 故障位置id
        'LocationName': this.form.LocationName, // 故障位置说明
        'QuestionTypeId': this.form.QuestionTypeId ? this.form.QuestionTypeId : 0, // 问题类别
        'QuestionTypeLev': this.form.QuestionTypeLev, // 问题类别层级
        'QuestionTypeName': this.form.QuestionTypeName, // 问题名称
        'DegreeId': this.form.DegreeId ? this.form.DegreeId : 0, // 问题级别id
        'DegreeName': this.form.DegreeName, // 问题级别说明
        'Description': this.form.Description, // 描述
        'ImagePath': this.form.ImagePath, // 图片
        'FinishImgPath': this.form.FinishImgPath, // 完成图片
        'Comments': this.form.Comments, // 初步分析结果
        'Progress': this.form.Progress, // 整改进度Progress
        'RejectComments': this.form.RejectComments, // 驳回时意见
        'Result': this.form.Result, // 最后处理结果
        'Status': Status, // 状态（0待提交1待处理2驳回3已分配4完成）
        'RepairUser': this.form.RepairUser
      }
      commonFunc.myConsole(JSON.stringify(conditionsParams))
      let resData = ''
      if (this.identity.Identity === '96') {
        resData = await centralStationApi.getcentralStationadd(conditionsParams)
      } else if (this.identity.Identity === '97') {
        resData = await centralStationApi.getQuestionaudit(conditionsParams)
      } else if (this.identity.Identity === '98') {
        resData = await centralStationApi.getQuestionaudit(conditionsParams)
      }
      if (resData.status === '000') {
        this.centralStationFormDialogVisible = false
        this.ResultFormDialogVisible = false
        this.rejectFormDialogVisible = false
        this.repairFormDialogVisible = false
        this.regulateFormDialogVisible = false
        this.getcentralStationlist()
        this.$message({
          type: 'success',
          message: '操作成功!'
        })
      } else {
        this.$message.error('网络异常！')
      }
    },
    datepickerValuechange() {
      if (!commonFunc.isDefine(this.datepickervalue)) {
        this.datepickervalue = [0, 0]
      }
      // this.assemblelinks()
      // this.getcentralStationlist()
      // this.assemblelinks()
    },
    async getUsers() {
      let conditionsParams = {}
      let resData = await centralStationApi.getRepairUserlist(conditionsParams)
      if (resData.status === '000') {
        this.repairUserlist = resData.data.record
      } else {
        // this.$message.error('用户名或密码错误')
      }
    },
    async getALLUsers() {
      let conditionsParams = {
        'Key': this.IsWellDo1dialog.RepairUserName,
        'DepartmentLev': this.IsWellDo1dialog.DepartmentLev
      }
      let resData = await centralStationApi.getManager_repair(conditionsParams)
      if (resData.status === '000') {
        if (this.IsWellDo1dialog.RepairUserName === '' && this.IsWellDo1dialog.DepartmentLev === '') {
          this.IsWellDo1dialog.Useralllist = resData.data.record
        }
        this.IsWellDo1dialog.Userlist = resData.data.record
      } else {
        // this.$message.error('用户名或密码错误')
      }
    },
    async getcentralStationlist() {
      let resData = ''
      if (this.identity.Identity === '96') {
        let conditionsParams = {
          'DepartmentLev': this.search.DepartmentLev,
          'DegreeId': this.search.DegreeId,
          'QuestionTypeLev': this.search.QuestionTypeLev,
          'CurrentStatus': this.search.CurrentStatus,
          'IsRepeatQst': (this.search.IsRepeatQst === '2' || this.search.IsRepeatQst === '') ? '' : parseInt(this.search.IsRepeatQst),
          'LimitTime': this.search.LimitTime,
          'RepairUserName': this.search.RepairUserName,
          'PageNo': this.pagination.currentPage,
          'PageSize': this.pagination.pagesize,
          'StartTime': this.datepickervalue[0] || '', // 开始日期
          'EndTime': this.datepickervalue[1] || '' // 结束日期
        }
        commonFunc.myConsole(conditionsParams)
        resData = await centralStationApi.getcentralStationlist(conditionsParams)
      } else if (this.identity.Identity === '97') {
        let conditionsParams = {
          'DepartmentLev': this.search.DepartmentLev,
          'DegreeId': this.search.DegreeId,
          'QuestionTypeLev': this.search.QuestionTypeLev,
          // 'Finish': this.activeName === '2' ? 0 : '',
          'CurrentStatus': this.search.CurrentStatus,
          'IsRepeatQst': (this.search.IsRepeatQst === '2' || this.search.IsRepeatQst === '') ? '' : parseInt(this.search.IsRepeatQst),
          'LimitTime': this.search.LimitTime,
          'RepairUserName': this.search.RepairUserName,
          'PageNo': this.pagination.currentPage,
          'PageSize': this.pagination.pagesize,
          'StartTime': this.datepickervalue[0] || '', // 开始日期
          'EndTime': this.datepickervalue[1] || '' // 结束日期
        }
        commonFunc.myConsole(conditionsParams)
        resData = await centralStationApi.getQuestionlistaudit(conditionsParams)
      } else if (this.identity.Identity === '98') {
        let conditionsParams = {
          'DepartmentLev': this.search.DepartmentLev,
          'DegreeId': this.search.DegreeId,
          'QuestionTypeLev': this.search.QuestionTypeLev,
          // 'Finish': 1,
          'CurrentStatus': this.search.CurrentStatus,
          'IsRepeatQst': (this.search.IsRepeatQst === '2' || this.search.IsRepeatQst === '') ? '' : parseInt(this.search.IsRepeatQst),
          'LimitTime': this.search.LimitTime,
          'RepairUserName': this.search.RepairUserName,
          'PageNo': this.pagination.currentPage,
          'PageSize': this.pagination.pagesize,
          'StartTime': this.datepickervalue[0] || '', // 开始日期
          'EndTime': this.datepickervalue[1] || '' // 结束日期
        }
        commonFunc.myConsole(conditionsParams)
        resData = await centralStationApi.getQuestionlistaudit(conditionsParams)
      }
      if (resData.status === '000') {
        this.assemblelinks() // 刷新  导出链接
        this.pagination.totalNum = resData.data.totalNum
        this.centralStationlist = resData.data.record
      } else {
        // this.$message.error('用户名或密码错误')
      }
    },
    getImagePathinform(arr) { // ImagePath 等信息组装
      // commonFunc.myConsole(arr)
      let arr2 = arr.map(function(item, key, ary) {
        return item.response.url
      })
      this.form.ImagePath = arr2.join(',')
    },
    getImagePathinform2(arr) { // FinishImgPath 等信息组装
      // commonFunc.myConsole(arr)
      let arr2 = arr.map(function(item, key, ary) {
        return item.response.url
      })
      this.form.FinishImgPath = arr2.join(',')
    },
    showRepairUser(RepairUser) {
      // this.departOptions = commonFunc.arraySubBybool('isCheck', RepairUser)
      commonFunc.myConsole(RepairUser)
      this.tagrepair = [].concat(RepairUser)
      this.IsWellDo1dialog.tagrepair = [].concat(RepairUser)
      this.checkedrepair = RepairUser.map(function(item) {
        return item.UserId
      })
      // if (this.checkedrepair.length === this..length) {
      //   this.checkAll = true
      // } else
      if (this.checkedrepair.length > 0) {
        this.isIndeterminate = true
      }
      return RepairUser
    },
    showimages(fileStr) {
      let arr = fileStr.split(',')
      let opt = {}
      this.ImagePathlist = arr.map((value, key, arr) => {
        opt = {
          response: {
            original: '',
            state: '',
            title: '',
            url: value
          },
          name: '',
          url: this.imageip + value
        }
        return opt
      })
      return fileStr
    },
    showimages2(fileStr) {
      let arr = fileStr.split(',')
      let opt = {}
      this.ImagePathlist2 = arr.map((value, key, arr) => {
        opt = {
          response: {
            original: '',
            state: '',
            title: '',
            url: value
          },
          name: '',
          url: this.imageip + value
        }
        return opt
      })
      return fileStr
    },
    updateRow(index, resMembersDataArr) {
      commonFunc.myConsole(resMembersDataArr[index])
      this.tagrepair = []
      this.ImagePathlist = []
      this.ImagePathlist2 = []
      this.selectedOptions = []
      this.centralStationFormDialogVisible = true
      this.isIndeterminate = false
      this.IsWellDo1dialog.Userlist = [] // 清空负责人 可选列表
      this.IsWellDo1dialogclose() // 清空负责人  弹窗  查询条件等  实现每次点击编辑  数据初始化
      if (index === '') {
        this.selectedOptions = []
        this.ImagePathlist = []
        this.form = {
          'ID': '', // 为空新增不为空修改
          'IsRepeatQst': '0', // 是否是为体系审核重复性问题
          'IsWellDo': '0', // 是否自行整改
          'DepartmentId': '', // 部门id
          'DepartmentLev': '', // 部门层级
          'DepartmentName': '', // 部门名称
          'UserId': '0', // 用户id
          'UserName': '', // 用户名称
          'SubmitterName': '', // 中心站审核人员
          'Date': new Date(), // 日期
          'LimitTime': new Date(), // 整改时限
          'AuditorId': '', // 调控中心审核人员
          'AuditorName': '', // 调控中心审核人员
          'LocationId': '', // 故障位置id
          'LocationName': '', // 故障位置说明
          'QuestionTypeId': '', // 问题类别
          'QuestionTypeLev': '', // 问题类别层级
          'QuestionTypeName': '', // 问题名称
          'DegreeId': '', // 问题级别id
          'DegreeName': '', // 问题级别说明
          'Description': '', // 描述
          'ImagePath': '', // 图片
          'FinishImgPath': '', // 完成图片
          'Comments': '', // 初步分析结果
          'Progress': '', // 整改进度Progress
          'RejectComments': '', // 驳回时意见
          'Result': '', // 最后处理结果
          'Status': '', // 状态（0待提交1待处理2驳回3已分配4完成）
          'RepairUser': []
        }
      } else {
        this.form = {
          'ID': resMembersDataArr[index].ID, // 为空新增不为空修改
          'IsRepeatQst': resMembersDataArr[index].IsRepeatQst === 1 ? '1' : '0', // 是否重复性问题
          'IsWellDo': resMembersDataArr[index].IsWellDo === 1 ? '1' : '0', // 是否自行整改
          'DepartmentId': resMembersDataArr[index].DepartmentId ? resMembersDataArr[index].DepartmentId : '', // 部门id
          'DepartmentLev': resMembersDataArr[index].DepartmentLev, // 部门层级
          'DepartmentName': resMembersDataArr[index].DepartmentName, // 部门名称
          'UserId': resMembersDataArr[index].UserId, // 用户id
          'UserName': resMembersDataArr[index].UserName, // 用户名称
          'SubmitterName': resMembersDataArr[index].SubmitterName, // 中心站审核人员
          'Date': resMembersDataArr[index].Date, // 日期
          'AuditorId': resMembersDataArr[index].AuditorId ? resMembersDataArr[index].AuditorId : '', // 调控中心审核人员
          'AuditorName': resMembersDataArr[index].AuditorName, // 调控中心审核人员
          'LimitTime': resMembersDataArr[index].LimitTime, // 整改时限
          'LocationId': resMembersDataArr[index].LocationId ? resMembersDataArr[index].LocationId : '', // 故障位置id
          'LocationName': resMembersDataArr[index].LocationName, // 故障位置说明
          'QuestionTypeId': resMembersDataArr[index].QuestionTypeId ? this.OptionquesTypeinform(resMembersDataArr[index].QuestionTypeId) : '', // 问题类别
          'QuestionTypeLev': resMembersDataArr[index].QuestionTypeLev, // 问题类别层级
          'QuestionTypeName': resMembersDataArr[index].QuestionTypeName, // 问题名称
          'DegreeId': resMembersDataArr[index].DegreeId ? resMembersDataArr[index].DegreeId : '', // 问题级别id
          'DegreeName': resMembersDataArr[index].DegreeName, // 问题级别说明
          'Description': resMembersDataArr[index].Description, // 描述
          'ImagePath': resMembersDataArr[index].ImagePath ? this.showimages(resMembersDataArr[index].ImagePath) : '', // 图片
          'FinishImgPath': resMembersDataArr[index].FinishImgPath ? this.showimages2(resMembersDataArr[index].FinishImgPath) : '', // 完成图片
          'Comments': resMembersDataArr[index].Comments, // 初步分析结果
          'Progress': resMembersDataArr[index].Progress, // 整改进度Progress
          'RejectComments': resMembersDataArr[index].RejectComments, // 驳回时意见
          'Result': resMembersDataArr[index].Result, // 最后处理结果或者 整改措施
          'Status': resMembersDataArr[index].Status, // 状态（0待提交1待处理2驳回3已分配4完成）
          'RepairUser': this.showRepairUser(resMembersDataArr[index].RepairUser)
        }
      }
    },
    reject(Status) { // 列表驳回按钮
      this.rejectFormDialogVisible = true
    },
    repair(Status) { // 列表分配按钮
      this.repairFormDialogVisible = true
    },
    regulate(Status) { // 列表分配按钮
      this.regulateFormDialogVisible = true
    },
    Result(Status) { // 列表分配按钮
      if (!commonFunc.isDefine(this.form.DegreeId) || !commonFunc.isDefine(this.form.QuestionTypeId)) {
        this.isResult = true
      }
      this.ResultFormDialogVisible = true
    },
    viewdetails98(Status, index, resMembersDataArr) { // 查看
      this.identity.centraldisabled = false
      this.identity.controldisabled = false
      this.updateRow(index, resMembersDataArr)
    },
    viewdetails(Status, index, resMembersDataArr) { // 查看
      this.identity.centraldisabled = true
      this.identity.controldisabled = true
      this.updateRow(index, resMembersDataArr)
    },
    viewdetailsclose() {
      this.centralStationFormDialogVisible = false
      this.identitydisabled()
    },
    imageUrlclose() {
      this.dialogVisible = false
      // this.identitydisabled()
    },
    eltagdialogclose() {
      this.eltagdialogVisible = false
    },
    IsWellDo1dialogclose() { // 负责人 选择弹窗 点击关闭按钮  清空查询条件等
      this.IsWellDo1dialogVisible = false
      this.IsWellDo1dialog.tagrepair = []
      this.IsWellDo1dialog.RepairUserName = ''
      this.IsWellDo1dialog.checkedrepair = []
      this.IsWellDo1dialog.selectedwellOptions = []
      this.IsWellDo1dialog.DepartmentId = ''
      this.IsWellDo1dialog.DepartmentLev = ''
      this.IsWellDo1dialog.DepartmentName = ''
    },
    IsWellDo1dialogVisibleshow() { // 未提交状态时   编辑“＋” 添加整改负责人
      this.IsWellDo1dialog.DepartmentLev = ''
      this.IsWellDo1dialog.selectedwellOptions = []
      this.getALLUsers()
      this.IsWellDo1dialogVisible = true
      this.IsWellDo1dialog.tagrepair = [].concat(this.tagrepair)
      this.checkedrepair = this.tagrepair.map(function(item) {
        return item.UserId ? item.UserId : item.ID
      })
      commonFunc.myConsole(this.checkedrepair)
      // this.checkedrepair = []
    },
    IsWellDo1dialogSure() {
      this.tagrepair = [].concat(this.IsWellDo1dialog.tagrepair)
      this.IsWellDo1dialogVisible = false
      // this.checkedrepair = []
    },
    rejectviewdetailsclose() {
      // this.identitydisabled()
    },
    Resultviewdetailsclose() {
      this.ResultFormDialogVisible = false
      // this.form.DegreeId = ''
      // this.form.QuestionTypeId = ''
      // this.selectedOptions = []
      // this.identitydisabled()
    },
    deleteRow(index, rows) {
      let ArrayID = []
      ArrayID.push(this.centralStationlist[index].ID)
      this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.centralStation_del(ArrayID)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    async centralStation_del(ArrayID) {
      let conditionsParams = {
        'ArrayID': ArrayID
      }
      commonFunc.myConsole(conditionsParams)
      let resData = await centralStationApi.centralStationdel(conditionsParams)
      if (resData.status === '000') {
        // rows.splice(index, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.getcentralStationlist()
      } else {
        this.$message({
          type: 'error',
          message: '删除失败!'
        })
        // this.$message.error('用户名或密码错误')
      }
    },
    getDepartinform(value) { // DepartmentLev 等信息组装
      this.form.DepartmentID = value
      this.form.DepartmentLev = this.departmentlist[this.departmentlist.findIndex(item => item.ID === this.form.DepartmentID)].Level
      this.form.DepartmentName = this.departmentlist[this.departmentlist.findIndex(item => item.ID === this.form.DepartmentID)].DepartmentName
      // commonFunc.myConsole(this.form.DepartmentName)
    },
    getDepartinsearch(value) { // DepartmentLev 等信息组装
      // if (value > 0) {
      //   this.search.DepartmentID = value
      //   this.search.DepartmentLev = this.departmentlist[this.departmentlist.findIndex(item => item.ID === this.search.DepartmentID)].Level
      //   this.search.DepartmentName = this.departmentlist[this.departmentlist.findIndex(item => item.ID === this.search.DepartmentID)].DepartmentName
      // } else {
      //   this.search.DepartmentID = ''
      //   this.search.DepartmentLev = ''
      //   this.search.DepartmentName = ''
      // }
      // commonFunc.myConsole(this.search.DepartmentName)
      let len = value.length
      if (len > 0) {
        this.search.DepartmentID = value[len - 1]
        this.search.DepartmentLev = this.departwellcenterlist[this.departwellcenterlist.findIndex(item => item.ID === this.search.DepartmentID)].Level
        this.search.DepartmentName = this.departwellcenterlist[this.departwellcenterlist.findIndex(item => item.ID === this.search.DepartmentID)].DepartmentName
      } else {
        this.search.DepartmentID = ''
        this.search.DepartmentLev = ''
        this.search.DepartmentName = ''
      }
      // commonFunc.myConsole(this.search.QuestionTypeLev)
      // this.getcentralStationlist()
    },
    getDepartIsWellDo1dialog(value) { // DepartmentLev 等信息组装
      let len = value.length
      if (len > 0) {
        this.IsWellDo1dialog.DepartmentID = value[len - 1]
        this.IsWellDo1dialog.DepartmentLev = this.departRepaircenterlist[this.departRepaircenterlist.findIndex(item => item.ID === this.IsWellDo1dialog.DepartmentID)].Level
        this.IsWellDo1dialog.DepartmentName = this.departRepaircenterlist[this.departRepaircenterlist.findIndex(item => item.ID === this.IsWellDo1dialog.DepartmentID)].DepartmentName
      } else {
        this.IsWellDo1dialog.DepartmentID = ''
        this.IsWellDo1dialog.DepartmentLev = ''
        this.IsWellDo1dialog.DepartmentName = ''
      }
    },
    OptionquesTypeinform(QuestionTypeId) {
      let questionPro = this.questionTypelist[this.questionTypelist.findIndex(item => item.ID === QuestionTypeId)]
      this.selectedOptions = questionPro.selectedOptions
      this.selectedOptions.push(QuestionTypeId)
      return QuestionTypeId
    },
    getlocattinform(value) { // LocationId 等信息组装
      let arr = this.locationlist.filter(function(obj) {
        return obj.ID === value
      })
      if (arr.length > 0) {
        this.form.LocationId = arr[0].ID
        this.form.LocationName = arr[0].LocationName
      } else {
        this.form.LocationId = ''
        this.form.LocationName = ''
      }
    },
    getrepairinform(value) { // repair 等信息组装
      let arr = this.locationlist.filter(function(obj) {
        return obj.ID === value
      })
      if (arr.length > 0) {
        this.form.LocationId = arr[0].ID
        this.form.LocationName = arr[0].LocationName
      } else {
        this.form.LocationId = ''
        this.form.LocationName = ''
      }
    },
    getDegreeinform(value) { // Degree 等信息组装
      let arr = this.degreelist.filter(function(obj) {
        return obj.ID === value
      })
      if (arr.length > 0) {
        this.form.DegreeId = arr[0].ID
        this.form.DegreeName = arr[0].DegreeName
      } else {
        this.form.DegreeId = ''
        this.form.DegreeName = ''
      }
    },
    getregulateinform(value) { // regulate 等信息组装
      let arr = this.regulatelist.filter(function(obj) {
        return obj.ID === value
      })
      if (arr.length > 0) {
        this.form.AuditorId = arr[0].ID
        this.form.AuditorName = arr[0].NickName
      } else {
        this.form.AuditorId = ''
        this.form.AuditorName = ''
      }
    },
    getDegreeinsearch(value) { // Degree 等信息组装
      let arr = this.degreelist.filter(function(obj) {
        return obj.ID === value
      })
      if (arr.length > 0) {
        this.search.DegreeId = arr[0].ID
        this.search.DegreeName = arr[0].DegreeName
      } else {
        this.search.DegreeId = ''
        this.search.DegreeName = ''
      }
      // this.getcentralStationlist()
    },
    getquesTypeinsearch(value) {
      let len = value.length
      if (len > 0) {
        this.search.QuestionTypeId = value[len - 1]
        this.search.QuestionTypeLev = this.questionTypelist[this.questionTypelist.findIndex(item => item.ID === this.search.QuestionTypeId)].Level
        this.search.QuestionTypeName = this.questionTypelist[this.questionTypelist.findIndex(item => item.ID === this.search.QuestionTypeId)].TypeName
      } else {
        this.search.QuestionTypeId = ''
        this.search.QuestionTypeLev = ''
        this.search.QuestionTypeName = ''
      }
      // commonFunc.myConsole(this.search.QuestionTypeLev)
      // this.getcentralStationlist()
    },
    getquesTypeinform(value) {
      let len = value.length
      this.form.QuestionTypeId = value[len - 1]
      this.form.QuestionTypeLev = this.questionTypelist[this.questionTypelist.findIndex(item => item.ID === this.form.QuestionTypeId)].Level
      this.form.QuestionTypeName = this.questionTypelist[this.questionTypelist.findIndex(item => item.ID === this.form.QuestionTypeId)].TypeName
      // commonFunc.myConsole(this.form.QuestionTypeLev)
    },
    async getdegree() {
      let conditionsParams = {}
      let resData = await degreeApi.getalldegreelist(conditionsParams)
      if (resData.status === '000') {
        this.degreelist = resData.data.record
      } else {}
    },
    async getregulate() {
      let conditionsParams = {}
      let resData = await regulateApi.getregulatelist(conditionsParams)
      if (resData.status === '000') {
        this.regulatelist = resData.data.record
      } else {}
    },
    async getlocation() {
      let conditionsParams = {}
      let resData = await locationApi.getalllocationlist(conditionsParams)
      if (resData.status === '000') {
        this.locationlist = resData.data.record
      } else {
        this.$message.error('获取失败！')
      }
    },
    async getdepartmentlist() {
      let conditionsParams = {}
      let resData = await departmentApi.getDepartmentwell(conditionsParams)
      if (resData.status === '000') {
        this.departmentlist = resData.data.record
      } else {
        // this.$message.error('用户名或密码错误')
      }
    },
    async getdepartRepairlist() {
      let conditionsParams = {}
      let resData = await departmentApi.getDepartmentRepair(conditionsParams)
      if (resData.status === '000') {
        this.departRepairlist = resData.data.record
        if (resData.data.record.length > 0) {
          this.departmentwelArr(resData.data.record, 'Repair')
        }
      } else {
        // this.$message.error('用户名或密码错误')
      }
    },
    async getdepartmentwelllist() {
      let conditionsParams = {}
      let resData = await departmentApi.getDepartmentwellcenter(conditionsParams)
      if (resData.status === '000') {
        this.departmentwelllist = resData.data.record
        if (resData.data.record.length > 0) {
          this.departmentwelArr(resData.data.record, 'Well')
        }
      } else {
        // this.$message.error('用户名或密码错误')
      }
    },
    async departmentwelArr(children, key) {
      // let that = this
      let item = {}
      let arr2 = []
      let selectedOptions = []
      let ParentName = ''
      let ParentID = ''
      if (!commonFunc.isDefine(children)) {
        if (key === 'Repair') {
          this.departRepaircenterlist = []
        } else if (key === 'Well') {
          this.departwellcenterlist = []
        }
        return
      }
      let fn = function(children) {
        for (let i = 0; i < children.length; i++) {
          // let lastselectedOptions = selectedOptions.concat(selectedOptions)
          item = {
            ID: children[i].ID,
            Level: children[i].Level,
            DepartmentName: children[i].DepartmentName,
            ParentID: ParentID,
            ParentName: ParentName,
            selectedOptions: []
          }
          if (selectedOptions) {
            item.selectedOptions = selectedOptions.concat()
          }
          arr2.push(item)
          if (children[i].SubDeps) {
            selectedOptions.push(children[i].ID)
            ParentID = children[i].ID
            ParentName = children[i].DepartmentName
            fn(children[i].SubDeps)
          } else if (i === children.length - 1) {
            selectedOptions = []
            ParentID = ''
            ParentName = ''
          }
        }
      }
      fn(children)
      if (key === 'Repair') {
        this.departRepaircenterlist = arr2
      } else if (key === 'Well') {
        this.departwellcenterlist = arr2
      }
      // this.departwellcenterlist = arr2.filter(function(item) {
      //   return (item.TypeName.indexOf(that.DepName) > -1)
      // })
      localStorage.setItem('departwellcenterArr', JSON.stringify(arr2))
    },
    async getquestionTypelist() {
      let conditionsParams = ''
      let resData = await questionTypeApi.getquestionTypelist(conditionsParams)
      if (resData.status === '000') {
        this.questionTypecascader = resData.data.record
        this.questionTypeArr(resData.data.record)
      } else {
        // this.$message.error('用户名或密码错误')
      }
    },
    async questionTypeArr(children) {
      // let that = this
      let item = {}
      let arr2 = []
      let selectedOptions = []
      let ParentName = ''
      let ParentID = ''
      if (!commonFunc.isDefine(children)) {
        this.questionTypelist = []
        return
      }
      let fn = function(children) {
        for (let i = 0; i < children.length; i++) {
          // let lastselectedOptions = selectedOptions.concat(selectedOptions)
          item = {
            ID: children[i].ID,
            Level: children[i].Level,
            TypeName: children[i].TypeName,
            ParentID: ParentID,
            ParentName: ParentName,
            selectedOptions: []
          }
          if (selectedOptions) {
            item.selectedOptions = selectedOptions.concat()
          }
          arr2.push(item)
          if (children[i].SubNodes) {
            selectedOptions.push(children[i].ID)
            ParentID = children[i].ID
            ParentName = children[i].TypeName
            fn(children[i].SubNodes)
          } else if (i === children.length - 1) {
            selectedOptions = []
            ParentID = ''
            ParentName = ''
          }
        }
      }
      fn(children)
      this.questionTypelist = arr2
      // this.questionTypelist = arr2.filter(function(item) {
      //   return (item.TypeName.indexOf(that.DepName) > -1)
      // })
      localStorage.setItem('questionTypeArr', JSON.stringify(arr2))
    },
    assemblelinks() {
      let IsRepeatQst = (this.search.IsRepeatQst === '2' || this.search.IsRepeatQst === '') ? '' : parseInt(this.search.IsRepeatQst)
      this.reportfile = this.filepdf + 'ImportQuestionExcel.aspx?action=excel&StartTime=' + this.datepickervalue[0] + '&EndTime=' + this.datepickervalue[1] + '&DepartmentLev=' + this.search.DepartmentLev + '&DegreeId=' + this.search.DegreeId + '&QstTypeLev=' + this.search.QuestionTypeLev + '&CurrentStatus=' + this.search.CurrentStatus + '&IsRepeatQst=' + IsRepeatQst + '&LimitTime=' + this.search.LimitTime + '&RepairUserName=' + this.search.RepairUserName
      commonFunc.myConsole(this.reportfile)
    },
    identitydisabled() {
      if (this.identity.Identity === '96') {
        this.identity.centraldisabled = false
        this.identity.controldisabled = true
      } else if (this.identity.Identity === '97') {
        this.identity.centraldisabled = false
        this.identity.controldisabled = false
      } else if (this.identity.Identity === '98') {
        this.identity.centraldisabled = false
        this.identity.controldisabled = false
      }
    },
    handleCheckAllChange(val) {
      this.tagrepair = val ? this.repairUserlist.map(function(item) {
        return item
      }) : []
      this.checkedrepair = val ? this.repairUserlist.map(function(item) {
        return item.ID
      }) : []
      this.isIndeterminate = false
    },
    handlecheckedrepairChange(value) {
      let repairUserlist = this.repairUserlist
      let tagrepair = []
      value.filter(function(obj) {
        repairUserlist.map(function(item) {
          if (obj === item.ID) {
            tagrepair.push(item)
          }
        })
      })
      this.tagrepair = tagrepair
      commonFunc.myConsole(this.tagrepair)
      let checkedCount = value.length
      this.checkAll = checkedCount === this.repairUserlist.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.repairUserlist.length
    },
    handlecheckedIsWellDo1(value) {
      let repairUserlist = this.IsWellDo1dialog.Useralllist
      let tagrepair = []
      let obj2 = ''
      commonFunc.myConsole(repairUserlist)
      value.filter(function(obj) {
        repairUserlist.map(function(item) {
          if (obj === item.ID) {
            obj2 = {
              'UserId': item.ID,
              'UserName': item.NickName
            }
            tagrepair.push(obj2)
          }
        })
      })
      this.IsWellDo1dialog.tagrepair = tagrepair
      commonFunc.myConsole(this.IsWellDo1dialog.tagrepair)
      // let checkedCount = value.length
      // this.checkAll = checkedCount === this.repairUserlist.length
      // this.isIndeterminate = checkedCount > 0 && checkedCount < this.repairUserlist.length
    },
    handleClose(tag) {
      this.checkedrepair.splice(this.checkedrepair.indexOf(tag), 1)
      this.IsWellDo1dialog.tagrepair.splice(this.IsWellDo1dialog.tagrepair.findIndex(item => item.UserId === tag), 1)
    },
    handleClick(tab, event) {
      // this.getcentralStationlist()
    },
    handleSizeChange(val) {
      this.pagination.pagesize = val
      this.pagination.currentPage = 1
      this.getcentralStationlist()
    },
    handleCurrentChange(val) {
      this.pagination.currentPage = val
      this.getcentralStationlist()
    }
  }
}
</script>
<style lang="scss">
// .avatar-uploader .el-upload {
//     border: 1px dashed #d9d9d9;
//     border-radius: 6px;
//     cursor: pointer;
//     position: relative;
//     overflow: hidden;
// }
// .avatar-uploader .el-upload:hover {
//     border-color: #409EFF;
// }
// .avatar-uploader-icon {
//     font-size: 28px;
//     color: #8c939d;
//     width: 200px;
//     height: 100px;
//     line-height: 100px;
//     text-align: center;
// }
#tableDiv {
  .el-tabs--card>.el-tabs__header {
      border-bottom: 2px solid #FF6D18;
  }
  .el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
      border-bottom-color: #FF6D18;
  }
  .el-tabs__item:hover {
      color: #606266;
      cursor: pointer;
  }
  .el-tabs__item:focus {
      color: #FF6D18;
  }
  .el-tabs__item.is-active {
      color: #FFF;
      background-color: #FF6D18;
  }
}
.el-upload--picture-card {
    background-color: #fbfdff;
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 50px;
    height: 50px;
    line-height: 56px;
    vertical-align: top;
}
.el-upload-list--picture-card .el-upload-list__item {
    overflow: hidden;
    background-color: #fff;
    border: 1px solid #c0ccda;
    border-radius: 6px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 100px;
    height: 100px;
    margin: 0 8px 8px 0;
    display: inline-block;
}
.avatar {
    width: 60px;
    height: 60px;
    display: block;
}
#repairDiv {
  .el-checkbox {
      width: 120px;
      height: 30px;
      color:
      #606266;
      font-weight: 500;
      font-size: 14px;
      cursor: pointer;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
  }
  .el-form-item__content {
    line-height: 30px;
    position: relative;
    font-size: 14px;
  }
}
.el-checkbox {
    width: 100px;
    color:
    #606266;
    font-weight: 500;
    font-size: 14px;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
.el-checkbox {
    width: 100px;
    color:
    #606266;
    font-weight: 500;
    font-size: 14px;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
.el-checkbox + .el-checkbox {
    margin-left: 0px !important;
    width: 100px;
    height: 20px;
}
.el-checkbox-group .el-checkbox__label {
    height: 20px;
    display: inline-block;
    padding-left: 0px;
    margin-left: 10px;
    line-height: 19px;
    font-size: 12px;
    // color: #fff !important;
    // background-color: #ff7e33 !important;
    // border: 1px solid #ff7e33;
}
.sptitle{
  width:159px;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
  word-break:keep-all;

}
// .el-table .cell span{
//     box-sizing: border-box;
//     width: 179px;
// }
.el-popover {
    position: absolute;
    background: #fff;
    min-width: 150px;
    max-width: 400px;
    border: 1px solid #ebeef5;
    padding: 12px;
    z-index: 2000;
    color: #606266;
    line-height: 1.4;
    text-align: justify;
    font-size: 14px;
    -webkit-box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
</style>
