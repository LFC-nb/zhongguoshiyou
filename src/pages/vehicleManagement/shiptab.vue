<template>
<div class="hdp-uf hdp-uf-dc main-container hdp-w-100" >
  <div class="hdp-uf hdp-uf-dc hdp-w-100">
    <div class="hdp-uf hdp-uf-hsb menu-title hdp-w-100" style="background:#FFFFFF;padding:10px 10px 20px 10px">
      <div class="hdp-uf hdp-w-100 hdp-uf-dc">
        <div class="hdp-uf" style="margin-top:10px">
          <div class="hdp-uf ">
            <!-- <el-date-picker
              v-model="datepickervalue" size="small" @change="datepickerValuechange"
              type="daterange" value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker> -->
            <template>
              <div class="hdp-uf">
                <el-date-picker
                  v-model="datepickervalue[0]" size="small" @change="datepickerValuechange"
                  align="right"
                  type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                  placeholder="开始日期"
                  :picker-options="pickerOptions1">
                </el-date-picker>
              </div>
              <el-col class="line" :span="2" style="text-align: center;width: 1.5rem;line-height:32px">-</el-col>
              <div class="hdp-uf">
                <el-date-picker
                  v-model="datepickervalue[1]" size="small" @change="datepickerValuechange"
                  align="right"
                  type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                  placeholder="结束日期"
                  :picker-options="pickerOptions1">
                </el-date-picker>
              </div>
              <div v-if="identity.Identity === '83' || identity.Identity === '84'" class="hdp-uf" style="margin-left:15px;display: inline-block;">
                <el-cascader expand-trigger="hover" :options="departmentwelllist" :props="departwellcenterProps" v-model="search.selectedwellOptions" @change="getDepartinsearch" change-on-select size="small" placeholder="所属井站" clearable style="width:125px">
                </el-cascader>
              </div>
              <div v-if="(identity.Identity === '83' || identity.Identity === '84') && Tagslist.length > 0" class="hdp-uf" style="margin-left:15px;display: inline-block;">
                <el-cascader expand-trigger="hover" :options="Tagslist" :props="TagsProps" v-model="search.selectedTagsOptions" @change="getTagsinsearch" change-on-select size="small" placeholder="所属区域" clearable style="width:125px">
                </el-cascader>
              </div>
            </template>
          </div>
          <div class="hdp-uf" style="margin-left:15px">
            <el-button @click="shipList_well" size="small" type="primarydel">查询</el-button>
          </div>
          <!-- <div v-if="identity.Identity === '81' && (this.carInputRight === '1' || this.carInputRight === '0')" class="hdp-uf psc-font-3" style="margin-left:15px">
            <el-button @click="addruck('1')" type="primary" size="small">
              <i aria-hidden="true" class="fa  fa-fw fa-plus-square-o" style="font-size: 12px;"></i>
              凝析油</el-button>
          </div>
          <div v-if="identity.Identity === '81' && (this.carInputRight === '2' || this.carInputRight === '0')" class="hdp-uf psc-font-3" style="margin-left:15px">
            <el-button @click="addruck('2')" type="primary" size="small" style="color: #fff !important;background-color: #409EFF !important;border-color: #409EFF !important;">
              <i aria-hidden="true" class="fa  fa-fw fa-plus-square-o" style="font-size: 12px;"></i>
              气田水</el-button>
          </div> -->
          <div v-if="this.identity.Identity !== '81'" class="hdp-uf" style="margin-left:15px">
            <a target="_self" :href='reportfile' class="el-button el-button--primary el-button--small">
              导出excel</a>
          </div>
        </div>
      </div>
    </div>
    <div id='shiptab' class="hdp-uf hdp-w-100 hdp-uf-dc" style="background:#FFFFFF;padding: 10px 10px 20px 10px;;margin-top:10px">
      <template>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane v-if="this.carInputRight === '1' || this.carInputRight === '0'" label="凝析油" name="1"></el-tab-pane>
          <el-tab-pane v-if="this.identity.Identity !== '82' && (this.carInputRight === '2' || this.carInputRight === '0')" label="气田水" name="2"></el-tab-pane>
        </el-tabs>
      </template>
      <el-dialog :close-on-click-modal="false" :visible.sync="dialogVisible" v-if="dialogVisible" @close="imageUrlclose" width="800px"  :modal-append-to-body='false'>
        <img width="100%" :src="imageUrl" alt="">
      </el-dialog>
      <el-dialog :close-on-click-modal="false" title="编辑" :visible.sync="shiptabFormDialogVisible" v-if="shiptabFormDialogVisible" @close="viewdetailsclose" width="1200px">
        <div class="dialog-content">
          <el-form ref="shiptabForm" :inline="true" :model="shiptabForm" label-width="150px">
            <div class="" style="width:724px;display: inline-block;">
              <el-form-item label="井站" prop="DepartmentId" style="width: 350px">
                <el-select v-model="shiptabForm.tranStation.DepartmentId" size="small" @change="getDepartinform" :disabled="identity.TranStation_disabled" placeholder="请选择">
                  <el-option v-for="item in shiptabForm.tranStation.tranStationlist" :key="item.DepartmentId" :label="item.DepartmentName" :value="item.DepartmentId"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="卸载地" prop="ShipPlaceId" style="width: 350px">
                <el-select v-model="shiptabForm.shipplace.ShipPlaceId" size="small" @change="getshipplaceinform" :disabled="identity.TranStation_disabled" placeholder="请选择">
                  <el-option v-for="item in shiptabForm.shipplace.shipplacelist" :key="item.ID" :label="item.Place" :value="item.ID"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item v-if="shiptabForm.carType.CarType === '2'" label="拉运类型" prop="WaterType" style="width: 350px">
                <el-select v-model="shiptabForm.waterType.WaterType" size="small" :disabled="identity.TranStation_disabled" @change="WaterTypechange" placeholder="请选择">
                  <el-option key="3" label="气田水" value="3"></el-option>
                  <el-option key="4" label="方井水" value="4"></el-option>
                  <el-option key="5" label="清水" value="5"></el-option>
                  <el-option key="6" label="返空" value="6"></el-option>
                  <el-option key="7" label="值班" value="7"></el-option>
                </el-select>
              </el-form-item>
              <!-- <el-form-item v-if="shiptabForm.carType.CarType === '1'" label="" prop="" style="width: 350px">
                占位
              </el-form-item> -->
              <el-form-item label="进站日期" prop="Date" style="width: 350px">
                <el-date-picker v-model="shiptabForm.datetime.Date" type="date" size="small" :disabled="identity.TranStation_disabled" @blur="datechange('Start')" placeholder="选择日期" :picker-options="pickerOptions1" :clearable="false"></el-date-picker>
              </el-form-item>
              <el-form-item v-if="shiptabForm.carType.CarType === '2' && shiptabForm.waterType.WaterType !== '3'" label="进站时间" prop="ArrivalTime" style="width: 350px">
                <el-time-picker v-model="shiptabForm.datetime.ArrivalTime" format="HH:mm" @blur="setstartime" size="small" disabled :clearable="false"></el-time-picker>
              </el-form-item>
              <el-form-item v-else label="进站时间" prop="ArrivalTime" style="width: 350px">
                <el-time-picker v-model="shiptabForm.datetime.ArrivalTime" format="HH:mm" @blur="setstartime" size="small" :disabled="identity.TranStation_disabled"  :clearable="false"></el-time-picker>
              </el-form-item>
              <el-form-item label="出站日期" prop="LeaveDate" style="width: 350px">
                <el-date-picker v-model="shiptabForm.datetime.LeaveDate" type="date" @blur="setstartdate" size="small" :disabled="identity.TranStation_disabled" placeholder="选择日期" :picker-options="pickerOptions2" :clearable="false"></el-date-picker>
              </el-form-item>
              <el-form-item v-if="shiptabForm.carType.CarType === '2' && shiptabForm.waterType.WaterType !== '3'" label="出站时间" prop="LeaveTime" style="width: 350px">
                <el-time-picker v-model="shiptabForm.datetime.LeaveTime" :picker-options="shiptabForm.datetime.pickeroptions"  @blur="timerDiff" format="HH:mm" size="small" disabled :clearable="false"></el-time-picker>
              </el-form-item>
              <el-form-item v-else label="出站时间" prop="LeaveTime" style="width: 350px">
                <el-time-picker v-model="shiptabForm.datetime.LeaveTime" :picker-options="shiptabForm.datetime.pickeroptions"  @blur="timerDiff" format="HH:mm" size="small" :disabled="identity.TranStation_disabled" :clearable="false"></el-time-picker>
              </el-form-item>
              <el-form-item label="运单号" prop="OrderNo" size="small" style="width:350px">
                <el-input v-model="shiptabForm.OrderNo" :disabled="identity.TranStation_disabled" maxlength='7' placeholder="7位" @mousewheel.native.prevent></el-input>
              </el-form-item>
              <el-form-item label="车牌号" prop="CarNo" style="width: 350px">
                <el-select v-model="shiptabForm.truck.CarNo" size="small" filterable @change="gettruckinform" @blur="calDiffWeight" :disabled="identity.TranStation_disabled" placeholder="请选择">
                  <el-option v-for="item in shiptabForm.truck.trucklist" :key="item.ID" :label="item.CarNo" :value="item.CarNo"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="驾驶员" prop="DriverId" style="width: 350px">
                <el-select v-model="shiptabForm.driver.DriverId" size="small" filterable @change="getdriverinform" :disabled="identity.TranStation_disabled" placeholder="请选择">
                  <el-option v-for="item in shiptabForm.driver.driverlist" :key="item.ID" :label="item.DriverName" :value="item.ID"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div id='picDcm' class="" style="width:360px;display: inline;">
              <el-form-item label="运单图片" prop="ImagePath" size="small" style="width:350px">
                <!-- <el-upload style="width:350px" :file-list="ImagePathlist" :disabled="identity.centraldisabled"
                  :action="uploadip" :limit="1" list-type="picture-card"
                  :on-preview="handlePictureCardPreview" :on-remove="handleRemove"
                  :on-exceed="handleExceed"
                  :on-success="handleSuccess" :on-error="handleError">
                  <i class="el-icon-plus"></i>
                </el-upload> -->
                <el-upload
                  class="avatar-uploader" style="width:175px"
                  :action="uploadip" :show-file-list="false" :disabled="identity.TranStation_disabled"
                  :on-success="handleSuccess"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </div>
            <!-- <el-form-item label="拉运类型" prop="CarType" style="width: 350px">
              <el-select v-model="shiptabForm.carType.CarType" size="small" placeholder="请选择">
                <el-option key="0" label="全部" value="0"></el-option>
                <el-option key="1" label="凝析油" value="1"></el-option>
                <el-option key="2" label="气田水" value="2"></el-option>
              </el-select>
            </el-form-item> -->
            <!-- <el-form-item v-if="shiptabForm.carType.CarType === '1'" label="铅封号" prop="SealNo" size="small" style="width:1160px;" id="tag-el-form-item__content">
              <div class="" style="width:1040px">
                <el-tag :key="tag" v-for="tag in dynamicTags" :closable="!identity.TranStation_disabled" :disable-transitions="identity.TranStation_disabled" @close="handleClose(tag)">{{tag}}</el-tag>
                <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" maxlength="6" ref="saveTagInput" size="small" :disabled="identity.TranStation_disabled" @keyup.enter.native="handleInputConfirm"  @blur="handleInputConfirm"></el-input>
                <el-button v-else class="button-new-tag" size="small" type="primarydel" :disabled="identity.TranStation_disabled" @click="showInput">+铅封({{shiptabForm.sealNum}}个)</el-button>
              </div>
            </el-form-item> -->
            <el-form-item v-if="shiptabForm.carType.CarType === '2'" label="水罐1      液位计故障" prop="Invalid1" size="small" style="width:350px">
              <el-radio v-model="shiptabForm.Invalid1" :disabled="identity.TranStation_disabled" label="1" @change="Invalid1change" style="margin-left:10px">是</el-radio>
              <el-radio v-model="shiptabForm.Invalid1" :disabled="identity.TranStation_disabled" label="0" @change="Invalid1change">否</el-radio>
            </el-form-item>
            <el-form-item v-if="shiptabForm.carType.CarType === '2'" label="水罐2      液位计故障" prop="Invalid1" size="small" style="width:350px">
              <el-radio v-model="shiptabForm.Invalid2" :disabled="identity.TranStation_disabled" label="1" @change="Invalid2change" style="margin-left:10px">是</el-radio>
              <el-radio v-model="shiptabForm.Invalid2" :disabled="identity.TranStation_disabled" label="0" @change="Invalid2change">否</el-radio>
            </el-form-item>
            <el-form-item v-if="shiptabForm.carType.CarType === '2'" label="" prop="" style="width: 350px">
              <!-- 占位 -->
            </el-form-item>
            <el-form-item v-if="shiptabForm.carType.CarType === '2'" :inline="true" label="水罐1      拉前" prop="Height" size="small" style="width: 350px">
              <div class="hdp-uf hdp-uf-hc">
                <!-- 拉前液位(cm) -->
                <el-input v-if="shiptabForm.Invalid1 === '1' && shiptabForm.waterType.WaterType === '3'" style="width: 45%" placeholder="液位(cm)"
                v-model="shiptabForm.HeightFront" disabled
                @blur="waterHeightBack" @mousewheel.native.prevent></el-input>
                <el-input v-else-if="shiptabForm.Invalid1 === '0' && shiptabForm.waterType.WaterType === '3'"
                type="number" style="width: 45%" placeholder="液位(cm)"
                v-model="shiptabForm.HeightFront" :disabled="identity.Oilinspd_disabled"
                @blur="waterHeightBack" @mousewheel.native.prevent></el-input>
                <el-input v-else type="number" style="width: 45%" placeholder="液位(cm)"
                v-model="shiptabForm.HeightFront" disabled @blur="waterHeightBack" @mousewheel.native.prevent></el-input>
                <div class="hdp-uf hdp-uf-hc" style="width: 10%">/</div>
                <el-input v-if="shiptabForm.Invalid1 === '0' && shiptabForm.waterType.WaterType === '3'" type="number" style="width: 45%" placeholder="液量(方)" v-model="shiptabForm.Weight" @blur="calWaterNum" :disabled="identity.Oilinspd_disabled" @mousewheel.native.prevent></el-input>
                <el-input v-else type="number" style="width: 45%" placeholder="液量(方)" v-model="shiptabForm.Weight" @blur="calWaterNum" disabled @mousewheel.native.prevent></el-input>
                  <!-- <div class="hdp-uf hdp-uf-hc" style="width: 10%">/</div>
                <el-input type="number" style="width: 45%" placeholder="拉前液位(cm)" v-if="!(shiptabForm.HeightFront > 0)" v-model="shiptabForm.HeightBack" @blur="waterHeightBack" disabled @mousewheel.native.prevent></el-input>
                <el-input type="number" style="width: 45%" placeholder="拉前液位(cm)" v-else v-model="shiptabForm.HeightBack" @blur="waterHeightBack" :disabled="identity.Oilinspd_disabled" @mousewheel.native.prevent></el-input> -->
              </div>
            </el-form-item>
            <!-- <el-form-item v-if="shiptabForm.carType.CarType === '2'" label="" prop="Weight" size="small" style="width:243px">
              <div class="hdp-uf hdp-uf-hc">
                拉前水罐液量(方)
                <el-input type="number" style="width: 100%" placeholder="拉前水罐液量(方)" v-model="shiptabForm.Weight" @blur="calWaterNum" :disabled="identity.Oilinspd_disabled" @mousewheel.native.prevent></el-input>
                  <div class="hdp-uf hdp-uf-hc" style="width: 10%">/</div>
                <el-input type="number" style="width: 45%" placeholder="拉前水罐液量(方)" v-if="!(shiptabForm.HeightBack > 0)" v-model="shiptabForm.WeightTwo" @blur="calWaterNum" disabled @mousewheel.native.prevent></el-input>
                <el-input type="number" style="width: 45%" placeholder="拉前水罐液量(方)" v-else v-model="shiptabForm.WeightTwo" @blur="calWaterNum" :disabled="identity.Oilinspd_disabled" @mousewheel.native.prevent></el-input>
              </div>
            </el-form-item> -->
            <el-form-item v-if="shiptabForm.carType.CarType === '2'" :inline="true" label="拉后" size="small" style="width: 350px">
              <div class="hdp-uf hdp-uf-hc">
                <!-- 拉后液位(cm) -->
                <el-input v-if="shiptabForm.Invalid1 === '0' && shiptabForm.waterType.WaterType === '3'" type="number" style="width: 45%" placeholder="液位(cm)" v-model="shiptabForm.RealHeightFront" :disabled="identity.Oilinspd_disabled" @mousewheel.native.prevent></el-input>
                <el-input v-else type="number" style="width: 45%" placeholder="液位(cm)" v-model="shiptabForm.RealHeightFront" disabled @mousewheel.native.prevent></el-input>
                <div class="hdp-uf hdp-uf-hc" style="width: 10%">/</div>
                <el-input v-if="shiptabForm.Invalid1 === '0' && shiptabForm.waterType.WaterType === '3'" type="number" style="width: 45%" placeholder="液量(方)" v-model="shiptabForm.RealWeight" @blur="calWaterNum" :disabled="identity.Oilinspd_disabled" @mousewheel.native.prevent></el-input>
                <el-input v-else type="number" style="width: 45%" placeholder="液量(方)" v-model="shiptabForm.RealWeight" @blur="calWaterNum" disabled @mousewheel.native.prevent></el-input>
                  <!-- <div class="hdp-uf hdp-uf-hc" style="width: 10%">/</div>
                <el-input type="number" style="width: 45%" placeholder="拉后液位(cm)" v-if="!(shiptabForm.HeightBack > 0)" v-model="shiptabForm.RealHeightBack" disabled @mousewheel.native.prevent></el-input>
                <el-input type="number" style="width: 45%" placeholder="拉后液位(cm)" v-else v-model="shiptabForm.RealHeightBack" :disabled="identity.Oilinspd_disabled" @mousewheel.native.prevent></el-input> -->
              </div>
            </el-form-item>
            <!-- <el-form-item v-if="shiptabForm.carType.CarType === '2'" label="" size="small" style="width:243px">
              <div class="hdp-uf hdp-uf-hc">
                拉后水罐液量(方)
                <el-input type="number" style="width: 100%" placeholder="拉后水罐液量(方)" v-model="shiptabForm.RealWeight" @blur="calWaterNum" :disabled="identity.Oilinspd_disabled" @mousewheel.native.prevent></el-input>
                  <div class="hdp-uf hdp-uf-hc" style="width: 10%">/</div>
                <el-input type="number" style="width: 45%" placeholder="拉后水罐液量(方)" v-if="!(shiptabForm.HeightBack > 0)" v-model="shiptabForm.RealWeightTwo" @blur="calWaterNum" disabled @mousewheel.native.prevent></el-input>
                <el-input type="number" style="width: 45%" placeholder="拉后水罐液量(方)" v-else v-model="shiptabForm.RealWeightTwo" @blur="calWaterNum" :disabled="identity.Oilinspd_disabled" @mousewheel.native.prevent></el-input>
              </div>
            </el-form-item> -->
            <el-form-item v-if="shiptabForm.carType.CarType === '2'" :inline="true" label="水量" prop="RealWeight" size="small" style="width: 350px">
              <div class="hdp-uf hdp-uf-hc">
                <el-input v-if="shiptabForm.Invalid1 === '0' || shiptabForm.waterType.WaterType !== '3'" type="number" :disabled="true" readonly="readonly" placeholder="水量(方)" v-model="shiptabForm.WaterNumOne" @mousewheel.native.prevent></el-input>
                <el-input v-else-if="shiptabForm.Invalid1 === '1' && shiptabForm.waterType.WaterType === '3'" type="number" placeholder="水量(方)" v-model="shiptabForm.WaterNumOne" @blur="calTotalWater" @mousewheel.native.prevent></el-input>
                    <!-- <div class="hdp-uf hdp-uf-hc" style="width: 10%">/</div>
                <el-input type="number" style="width: 45%" :disabled="true" readonly="readonly" placeholder="水量(方)" v-model="shiptabForm.WaterNumTwo" @mousewheel.native.prevent></el-input> -->
              </div>
            </el-form-item>

            <el-form-item v-if="shiptabForm.carType.CarType === '2'" :inline="true" label="水罐2        拉前" prop="Height" size="small" style="width: 350px">
              <!-- <label for="Height" class="el-form-item__label" style="width: 28px;height:40px;float:left;padding-right:2px">拉前</label> -->
              <div class="hdp-uf hdp-uf-hc" >
                <!-- 拉前液位(cm) -->
                <!-- <el-input type="number" style="width: 45%" placeholder="拉前液位(cm)" v-model="shiptabForm.HeightFront" :disabled="identity.Oilinspd_disabled" @blur="waterHeightBack" @mousewheel.native.prevent></el-input>
                  <div class="hdp-uf hdp-uf-hc" style="width: 10%">/</div> -->
                <el-input type="number" style="width: 45%" placeholder="液位(cm)" v-if="shiptabForm.Invalid2 === '1' || !(shiptabForm.HeightFront > 0)" v-model="shiptabForm.HeightBack" @blur="waterHeightBack" disabled @mousewheel.native.prevent></el-input>
                <el-input type="number" style="width: 45%" placeholder="液位(cm)" v-else v-model="shiptabForm.HeightBack" @blur="waterHeightBack" :disabled="identity.Oilinspd_disabled" @mousewheel.native.prevent></el-input>
                <div class="hdp-uf hdp-uf-hc" style="width: 10%">/</div>
                <el-input type="number" style="width: 45%" placeholder="液量(方)" v-if="shiptabForm.Invalid2 === '1' || !(shiptabForm.HeightBack > 0)" v-model="shiptabForm.WeightTwo" @blur="calWaterNum" disabled @mousewheel.native.prevent></el-input>
                <el-input type="number" style="width: 45%" placeholder="液量(方)" v-else v-model="shiptabForm.WeightTwo" @blur="calWaterNum" :disabled="identity.Oilinspd_disabled" @mousewheel.native.prevent></el-input>
              </div>
            </el-form-item>
            <!-- <el-form-item v-if="shiptabForm.carType.CarType === '2'" label="" prop="Weight" size="small" style="width:243px">
              <label for="Height" class="el-form-item__label" style="width: 63px;height:40px;float:left;">拉前液量</label>
              <div class="hdp-uf hdp-uf-hc" style="width: 110px">
                拉前水罐液量(方)
                <el-input type="number" style="width: 45%" placeholder="拉前水罐液量(方)" v-model="shiptabForm.Weight" @blur="calWaterNum" :disabled="identity.Oilinspd_disabled" @mousewheel.native.prevent></el-input>
                  <div class="hdp-uf hdp-uf-hc" style="width: 10%">/</div>
                <el-input type="number" style="width: 100%" placeholder="(方)" v-if="!(shiptabForm.HeightBack > 0)" v-model="shiptabForm.WeightTwo" @blur="calWaterNum" disabled @mousewheel.native.prevent></el-input>
                <el-input type="number" style="width: 100%" placeholder="(方)" v-else v-model="shiptabForm.WeightTwo" @blur="calWaterNum" :disabled="identity.Oilinspd_disabled" @mousewheel.native.prevent></el-input>
              </div>
            </el-form-item> -->
            <el-form-item v-if="shiptabForm.carType.CarType === '2'" :inline="true" label="拉后" size="small" style="width: 350px">
              <!-- <label for="Height" class="el-form-item__label" style="width: 28px;height:40px;float:left;padding-right:2px"></label> -->
              <div class="hdp-uf hdp-uf-hc">
                <!-- 拉后液位(cm) -->
                <!-- <el-input type="number" style="width: 45%" placeholder="拉后液位(cm)" v-model="shiptabForm.RealHeightFront" :disabled="identity.Oilinspd_disabled" @mousewheel.native.prevent></el-input>
                  <div class="hdp-uf hdp-uf-hc" style="width: 10%">/</div> -->
                <el-input type="number" style="width: 45%" placeholder="液位(cm)" v-if="shiptabForm.Invalid2 === '1' || !(shiptabForm.HeightBack > 0)" v-model="shiptabForm.RealHeightBack" disabled @mousewheel.native.prevent></el-input>
                <el-input type="number" style="width: 45%" placeholder="液位(cm)" v-else v-model="shiptabForm.RealHeightBack" :disabled="identity.Oilinspd_disabled" @mousewheel.native.prevent></el-input>
                <div class="hdp-uf hdp-uf-hc" style="width: 10%">/</div>
                <el-input type="number" style="width: 45%" placeholder="液量(方)" v-if="shiptabForm.Invalid2 === '1' || !(shiptabForm.HeightBack > 0)" v-model="shiptabForm.RealWeightTwo" @blur="calWaterNum" disabled @mousewheel.native.prevent></el-input>
                <el-input type="number" style="width: 45%" placeholder="液量(方)" v-else v-model="shiptabForm.RealWeightTwo" @blur="calWaterNum" :disabled="identity.Oilinspd_disabled" @mousewheel.native.prevent></el-input>
              </div>
            </el-form-item>
            <el-form-item v-if="shiptabForm.carType.CarType === '2'" :inline="true" label="水量" prop="RealWeight" size="small" style="width: 350px">
              <div class="hdp-uf hdp-uf-hc">
                <!-- <el-input type="number" style="width: 45%" :disabled="true" readonly="readonly" placeholder="水量(方)" v-model="shiptabForm.WaterNumOne" @mousewheel.native.prevent></el-input>
                  <div class="hdp-uf hdp-uf-hc" style="width: 10%">/</div> -->
                <el-input v-if="shiptabForm.Invalid2 === '0' || shiptabForm.waterType.WaterType !== '3'" type="number" :disabled="true" readonly="readonly" placeholder="水量(方)" v-model="shiptabForm.WaterNumTwo" @mousewheel.native.prevent></el-input>
                <el-input v-else-if="shiptabForm.Invalid2 === '1' && shiptabForm.waterType.WaterType === '3'" type="number" placeholder="水量(方)" v-model="shiptabForm.WaterNumTwo"  @blur="calTotalWater" @mousewheel.native.prevent></el-input>
              </div>
            </el-form-item>
            <!-- <el-form-item v-if="shiptabForm.carType.CarType === '2'" label="" size="small" style="width:243px">
              <label for="Height" class="el-form-item__label" style="width: 63px;height:40px;float:left;">拉后液量</label>
              <div class="hdp-uf hdp-uf-hc" style="width: 110px">
                拉后水罐液量(方)
                <el-input type="number" style="width: 45%" placeholder="拉后水罐液量(方)" v-model="shiptabForm.RealWeight" @blur="calWaterNum" :disabled="identity.Oilinspd_disabled" @mousewheel.native.prevent></el-input>
                  <div class="hdp-uf hdp-uf-hc" style="width: 10%">/</div>
                <el-input type="number" style="width: 100%" placeholder="(方)" v-if="!(shiptabForm.HeightBack > 0)" v-model="shiptabForm.RealWeightTwo" @blur="calWaterNum" disabled @mousewheel.native.prevent></el-input>
                <el-input type="number" style="width: 100%" placeholder="(方)" v-else v-model="shiptabForm.RealWeightTwo" @blur="calWaterNum" :disabled="identity.Oilinspd_disabled" @mousewheel.native.prevent></el-input>
              </div>
            </el-form-item> -->
            <el-form-item v-if="shiptabForm.carType.CarType === '2'" label="签认人" size="small" style="width: 350px">
              <el-input v-model="shiptabForm.signer.SignerName" :disabled="identity.TranStation_disabled" @mousewheel.native.prevent></el-input>
            </el-form-item>
            <!-- <el-form-item v-if="shiptabForm.carType.CarType === '2'" label="签认人" prop="SignerId" style="width: 350px">
              <el-select v-model="shiptabForm.signer.SignerId" :disabled="identity.TranStation_disabled" size="small" @change="getSignerinform" placeholder="请选择">
                <el-option v-for="item in shiptabForm.signer.signerlist" :key="item.ID" :label="item.NickName" :value="item.ID"></el-option>
              </el-select>
            </el-form-item> -->
            <el-form-item v-if="shiptabForm.carType.CarType === '2'" label="补水量(方)" prop="WaterAdd" size="small" style="width:350px">
              <el-input type="number" v-model="shiptabForm.WaterAdd" @blur="calTotalWater" @mousewheel.native.prevent :disabled="identity.Oilinspd_disabled" ></el-input>
            </el-form-item>
            <el-form-item v-if="shiptabForm.carType.CarType === '2'" label="签单量(方)" prop="TotalWater" size="small" style="width:350px">
              <el-input type="number"  v-model="shiptabForm.TotalWater" @mousewheel.native.prevent :disabled="identity.Oilinspd_disabled" ></el-input>
            </el-form-item>
            <el-form-item v-if="shiptabForm.carType.CarType === '2'" label="记录人" size="small" style="width: 350px">
              <el-input v-model="shiptabForm.recorder.RecorderName" :disabled="identity.TranStation_disabled" @mousewheel.native.prevent></el-input>
            </el-form-item>
            <!-- <el-form-item v-if="shiptabForm.carType.CarType === '2'" label="记录人" prop="RecorderId" style="width: 350px">
              <el-select v-model="shiptabForm.recorder.RecorderId" :disabled="identity.TranStation_disabled" size="small" @change="getRecorderinform" placeholder="请选择">
                <el-option v-for="item in shiptabForm.signer.signerlist" :key="item.ID" :label="item.NickName" :value="item.ID"></el-option>
              </el-select>
            </el-form-item> -->
            <el-form-item v-if="shiptabForm.carType.CarType === '1'" label="油罐1      液位计故障" prop="Invalid1" size="small" style="width:350px">
              <el-radio v-model="shiptabForm.Invalid1" :disabled="identity.TranStation_disabled" label="1" @change="Invalid1change" style="margin-left:10px">是</el-radio>
              <el-radio v-model="shiptabForm.Invalid1" :disabled="identity.TranStation_disabled" label="0" @change="Invalid1change">否</el-radio>
            </el-form-item>
            <el-form-item v-if="shiptabForm.carType.CarType === '1'" label="拉前液位" prop="Weight" size="small" style="width:350px">
              <el-input v-if="shiptabForm.Invalid1 === '1'" type="number" v-model="shiptabForm.OilLevBefore1" disabled @mousewheel.native.prevent @input="calDiffWeight"></el-input>
              <el-input v-else type="number" v-model="shiptabForm.OilLevBefore1" :disabled="identity.TranStation_disabled" @mousewheel.native.prevent @input="calDiffWeight"></el-input>
            </el-form-item>
            <el-form-item v-if="shiptabForm.carType.CarType === '1'" label="拉后液位" prop="Weight" size="small" style="width:350px">
              <el-input v-if="shiptabForm.Invalid1 === '1'" type="number" v-model="shiptabForm.OilLevAfter1" disabled @mousewheel.native.prevent @input="calDiffWeight"></el-input>
              <el-input v-else type="number" v-model="shiptabForm.OilLevAfter1" :disabled="identity.TranStation_disabled" @mousewheel.native.prevent @input="calDiffWeight"></el-input>
            </el-form-item>
            <el-form-item v-if="shiptabForm.carType.CarType === '1'" label="油罐2      液位计故障" prop="Invalid2" size="small" style="width:350px">
              <el-radio v-model="shiptabForm.Invalid2" :disabled="identity.TranStation_disabled" label="1" @change="Invalid2change" style="margin-left:10px">是</el-radio>
              <el-radio v-model="shiptabForm.Invalid2" :disabled="identity.TranStation_disabled" label="0" @change="Invalid2change">否</el-radio>
            </el-form-item>
            <el-form-item v-if="shiptabForm.carType.CarType === '1'" label="拉前液位" prop="Weight" size="small" style="width:350px">
              <el-input v-if="shiptabForm.Invalid2 === '1'" type="number" v-model="shiptabForm.OilLevBefore2" disabled @mousewheel.native.prevent @input="calDiffWeight"></el-input>
              <el-input v-else type="number" v-model="shiptabForm.OilLevBefore2" :disabled="identity.TranStation_disabled" @mousewheel.native.prevent @input="calDiffWeight"></el-input>
            </el-form-item>
            <el-form-item v-if="shiptabForm.carType.CarType === '1'" label="拉后液位" prop="Weight" size="small" style="width:350px">
              <el-input v-if="shiptabForm.Invalid2 === '1'" type="number" v-model="shiptabForm.OilLevAfter2" disabled @mousewheel.native.prevent @input="calDiffWeight"></el-input>
              <el-input v-else type="number" v-model="shiptabForm.OilLevAfter2" :disabled="identity.TranStation_disabled" @mousewheel.native.prevent @input="calDiffWeight"></el-input>
            </el-form-item>
            <el-form-item v-if="shiptabForm.carType.CarType === '1'" :inline="true" label="核定空高(cm)" prop="Height" size="small" style="width: 350px">
              <div class="hdp-uf hdp-uf-hc">
                <el-input type="number" style="width: 45%" placeholder="前" :disabled="true" readonly="readonly" v-model="shiptabForm.HeightFront" @mousewheel.native.prevent></el-input>
                  <div class="hdp-uf hdp-uf-hc" style="width: 10%">/</div>
                <el-input type="number" style="width: 45%" placeholder="后" :disabled="true" readonly="readonly" v-model="shiptabForm.HeightBack" @mousewheel.native.prevent></el-input>
              </div>
            </el-form-item>
            <el-form-item v-if="shiptabForm.carType.CarType === '1'" label="核定重量(t)" prop="Weight" size="small" style="width:350px">
              <el-input type="number" v-model="shiptabForm.Weight" :disabled="true" readonly="readonly" @mousewheel.native.prevent @input="calDiffWeight"></el-input>
            </el-form-item>
            <el-form-item v-if="shiptabForm.carType.CarType === '1'" :inline="true" label="井站实测空高(cm)" prop="WellHeight" size="small" style="width: 350px">
              <div class="hdp-uf hdp-uf-hc">
                <el-input type="number" style="width: 45%" placeholder="前" v-model="shiptabForm.WellHeightFront" :disabled="identity.TranStation_disabled" @mousewheel.native.prevent></el-input>
                  <div class="hdp-uf hdp-uf-hc" style="width: 10%">/</div>
                <el-input type="number" style="width: 45%" placeholder="后" v-if="shiptabForm.HeightBack === 0" v-model="shiptabForm.WellheightBack" disabled @mousewheel.native.prevent></el-input>
                <el-input type="number" style="width: 45%" placeholder="后" v-else v-model="shiptabForm.WellheightBack" :disabled="identity.TranStation_disabled" @mousewheel.native.prevent></el-input>
              </div>
            </el-form-item>
            <el-form-item class="yybcor" v-if="shiptabForm.carType.CarType === '1'" :inline="true" label="验油班实测空高(cm)" size="small" style="width: 350px">
              <div class="hdp-uf hdp-uf-hc">
                <el-input type="number" class="yybinputbor" style="width: 45%;" placeholder="前" v-model="shiptabForm.RealHeightFront" :disabled="identity.Oilinspd_disabled" @mousewheel.native.prevent></el-input>
                  <div class="hdp-uf hdp-uf-hc" style="width: 10%">/</div>
                <el-input type="number" class="yybinputbor" style="width: 45%;" placeholder="后" v-if="shiptabForm.HeightBack === 0" v-model="shiptabForm.RealHeightBack" disabled @mousewheel.native.prevent></el-input>
                <el-input type="number" class="yybinputbor" style="width: 45%;" placeholder="后" v-else v-model="shiptabForm.RealHeightBack" :disabled="identity.Oilinspd_disabled" @mousewheel.native.prevent></el-input>
              </div>
            </el-form-item>
            <el-form-item class="yybcor" v-if="shiptabForm.carType.CarType === '1'" label="实收重量(t)" prop="RealWeight" size="small" style="width:350px">
              <el-input type="number" class="yybinputbor" v-model="shiptabForm.RealWeight" @mousewheel.native.prevent  @blur="calDiffWeight" :disabled="identity.Oilinspd_disabled"></el-input>
            </el-form-item>
            <el-form-item class="yybcor" v-if="shiptabForm.carType.CarType === '1'" label="运差(t)" prop="DiffWeight" size="small" style="width:350px">
              <el-input type="number" :disabled="true" readonly="readonly"  v-model="shiptabForm.DiffWeight" @mousewheel.native.prevent></el-input>
            </el-form-item>
            <el-form-item class="yybcor" v-if="shiptabForm.carType.CarType === '1'" label="油密度(吨/方)" prop="Density" size="small" style="width:350px">
              <el-input type="number" class="yybinputbor" v-model="shiptabForm.Density" @mousewheel.native.prevent :disabled="identity.Oilinspd_disabled" ></el-input>
            </el-form-item>
            <el-form-item class="yybcor" v-if="shiptabForm.carType.CarType === '1'" label="单车含水(t)" prop="WaterAdd" size="small" style="width:350px">
              <el-input type="number" class="yybinputbor" v-model="shiptabForm.WaterAdd" @mousewheel.native.prevent :disabled="identity.Oilinspd_disabled" ></el-input>
            </el-form-item>
            <el-form-item class="yybcor" v-if="shiptabForm.carType.CarType === '1'" label="呼吸阀异常" prop="IsNormal" size="small" style="width:350px">
              <el-radio v-model="shiptabForm.IsNormal" :disabled="identity.Oilinspd_disabled" label="1" style="margin-left:10px">是</el-radio>
              <el-radio v-model="shiptabForm.IsNormal" :disabled="identity.Oilinspd_disabled" label="0">否</el-radio>
            </el-form-item>
            <!-- :disabled="true" readonly="readonly" -->
            <el-form-item class="yybcor" label="到达日期" prop="TargetDate" style="width: 350px">
              <el-date-picker class="yybinputbor yybinputicon"
              v-model="shiptabForm.datetime.TargetDate"
              type="date" size="small" :disabled="identity.Oilinspd_disabled"
              @blur="datechange('Arrival')" placeholder="选择日期"
              :picker-options="pickerOptions1" :clearable="false"></el-date-picker>
            </el-form-item>
            <el-form-item class="yybcor" label="到达时间" prop="TargetTime" style="width: 350px">
              <el-time-picker class="yybinputbor yybinputicon"
              v-if="shiptabForm.carType.CarType === '2' && shiptabForm.waterType.WaterType !== '3'" v-model="shiptabForm.datetime.TargetTime" format="HH:mm"  @blur="timerDiff" size="small" disabled :clearable="false"></el-time-picker>
              <el-time-picker class="yybinputbor yybinputicon"
              v-else v-model="shiptabForm.datetime.TargetTime" format="HH:mm"
              @blur="timerDiff" size="small" :disabled="identity.Oilinspd_disabled"
              :clearable="false"></el-time-picker>
            </el-form-item>
            <el-form-item class="yybcor" label="在途时间(分钟)" size="small" style="width:350px">
              <el-input type="text" :disabled="true" readonly="readonly" v-model="shiptabForm.datetime.shipMinuteStr" @mousewheel.native.prevent></el-input>
            </el-form-item>
            <el-form-item v-if="shiptabForm.carType.CarType === '1'" label="记录人" size="small" style="width: 350px">
              <el-input v-model="shiptabForm.recorder.RecorderName" :disabled="identity.TranStation_disabled" @mousewheel.native.prevent></el-input>
            </el-form-item>
            <el-form-item v-if="shiptabForm.carType.CarType === '1'" label="签认人" size="small" style="width: 350px">
              <el-input v-model="shiptabForm.signer.SignerName" :disabled="identity.TranStation_disabled" @mousewheel.native.prevent></el-input>
            </el-form-item>
            <el-form-item v-if="shiptabForm.carType.CarType === '2'" label="" prop="" style="width: 350px">
              <!-- 占位 -->
            </el-form-item>
            <el-form-item label="井站备注" size="small" style="width:700px">
              <el-input type="text" v-model="shiptabForm.Notes" :disabled="identity.TranStation_disabled" @mousewheel.native.prevent style="width:537px"></el-input>
            </el-form-item>
            <el-form-item class="yybcor" v-if="this.shiptabForm.carType.CarType === '1'" label="验油班备注" size="small" style="width:700px">
              <el-input type="text" class="yybinputbor" v-model="shiptabForm.Notes2" :disabled="identity.Oilinspd_disabled" @mousewheel.native.prevent style="width:537px"></el-input>
            </el-form-item>
            <el-form-item v-if="this.shiptabForm.Comments" label="驳回意见" size="small" style="width:700px">
              <el-input type="text" v-model="shiptabForm.Comments" disabled @mousewheel.native.prevent style="width:537px"></el-input>
            </el-form-item>
            <el-form-item v-if="this.shiptabForm.Remark !==''" label="异常情况" prop="TotalWater" size="small" style="width:700px">
              <el-input type="text" :disabled="true" readonly="readonly" v-model="shiptabForm.Remark" @mousewheel.native.prevent style="width:537px"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="" style="text-align:center;color:#FF6D18;font-size:11px;position: absolute;bottom: 18px;right:600px">* 严格按照运单进行填写 *</div>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="shiptabFormDialogVisible = false; Isdetailsview = '0';identitydisabled()" type="primarydel">取 消</el-button>
          <span v-if="this.Isdetailsview === '0'" class="" style="margin-left: 10px;">
            <el-button v-if="this.identity.Identity === '81' && this.shiptabForm.carType.CarType === '1' && this.shiptabForm.Status !== '3'" size="small" @click="editinfo(0)" type="primary">保 存</el-button>
            <el-button v-if="this.identity.Identity === '81' && this.shiptabForm.carType.CarType === '1' && this.IsToCheck === '1' && this.shiptabForm.Status !== '3'" size="small" @click="editinfo(1)" type="primary">提 交</el-button>
            <el-button v-if="this.identity.Identity === '81' && this.shiptabForm.carType.CarType === '1' && this.IsToCheck === '1' && this.shiptabForm.Status === '3'" size="small" @click="editinfo(3)" type="primary">提 交</el-button>
            <el-button v-if="this.identity.Identity === '81' && this.shiptabForm.carType.CarType === '1' && this.IsToCheck === '0' && this.shiptabForm.Status !== '3'" size="small" @click="editinfo(2)" type="primary">提 交</el-button>
            <el-button v-if="this.identity.Identity === '81' && this.shiptabForm.carType.CarType === '1' && this.IsToCheck === '0' && this.shiptabForm.Status === '3'" size="small" @click="editinfo(3)" type="primary">提 交</el-button>
            <el-button v-if="this.identity.Identity === '82' && this.shiptabForm.carType.CarType === '1' && this.shiptabForm.Status !== '3'" size="small" @click="editinfo(1)" type="primary">保 存</el-button>
            <el-button v-if="this.identity.Identity === '82' && this.shiptabForm.carType.CarType === '1' && this.shiptabForm.Status !== '3'" size="small" @click="editinfo(2)" type="primary">提 交</el-button>
            <el-button v-if="this.identity.Identity === '82' && this.shiptabForm.carType.CarType === '1' && this.shiptabForm.Status === '3'" size="small" @click="editinfo(3)" type="primary">提 交</el-button>
            <!-- <el-button v-if="this.identity.Identity === '83' && this.shiptabForm.carType.CarType === '1'" size="small" @click="editinfo(2)" type="primary">保 存</el-button>
            <el-button v-if="this.identity.Identity === '83' && this.shiptabForm.carType.CarType === '1'" size="small" @click="editinfo(4)" type="primary">提 交</el-button> -->
            <el-button v-if="this.identity.Identity === '84' && this.shiptabForm.carType.CarType === '1'" size="small" @click="editinfo(4)" type="primary">保 存</el-button>

            <el-button v-if="this.identity.Identity === '81' && this.shiptabForm.carType.CarType === '2' && this.shiptabForm.Status !== '3'" size="small" @click="editinfo(0)" type="primary">保 存</el-button>
            <el-button v-if="this.identity.Identity === '81' && this.shiptabForm.carType.CarType === '2'" size="small" @click="editinfo(2)" type="primary">提 交</el-button>
            <!-- <el-button v-if="this.identity.Identity === '82' && this.shiptabForm.carType.CarType === '2'" size="small" @click="editinfo(0)" type="primary">保 存</el-button>
            <el-button v-if="this.identity.Identity === '82' && this.shiptabForm.carType.CarType === '2'" size="small" @click="editinfo(2)" type="primary">提 交</el-button> -->
            <!-- <el-button v-if="this.identity.Identity === '83' && this.shiptabForm.carType.CarType === '2'" size="small" @click="editinfo(2)" type="primary">保 存</el-button>
            <el-button v-if="this.identity.Identity === '83' && this.shiptabForm.carType.CarType === '2'" size="small" @click="editinfo(4)" type="primary">提 交</el-button> -->
            <el-button v-if="this.identity.Identity === '84' && this.shiptabForm.carType.CarType === '2'" size="small" @click="editinfo(4)" type="primary">保 存</el-button>
          </span>
          <span v-if="this.Isdetailsview === '1'" class="" style="margin-left: 10px;">
            <el-button v-if="this.identity.Identity === '83' && this.shiptabForm.Status !== '4' && this.shiptabForm.Status !== '0'" size="small" @click="reject(3)" type="primary">驳 回</el-button>
            <el-button v-if="this.identity.Identity === '83' && this.shiptabForm.Status !== '4' && this.shiptabForm.Status !== '0'" size="small" @click="editinfo(4)" type="primary">通 过</el-button>
          </span>
          <!-- <span v-if="this.Isdetailsview === '2'" class="" style="margin-left: 10px;">
            <el-button v-if="this.identity.Identity === '83'" size="small" @click="reject(3)" type="primary">驳 回</el-button>
            <el-button v-if="this.identity.Identity === '83'" size="small" @click="editinfo(4)" type="primary">提 交</el-button>
          </span> -->
        </span>
      </el-dialog>
      <el-dialog :close-on-click-modal="false" title="驳回" :visible.sync="rejectFormDialogVisible" v-if="rejectFormDialogVisible" @close="rejectviewdetailsclose" width="500px">
        <div class="dialog-content">
          <el-form ref="shiptabForm" :inline="true" :model="shiptabForm" label-width="150px">
            <el-form-item label="" prop="" size="small" style="width:350px">
              <el-checkbox-group v-model="checkList" style="width:350px">
                <el-checkbox label="1">井站</el-checkbox>
                <el-checkbox v-if="this.shiptabForm.carType.CarType === '1'" label="2">验油班</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="" prop="" size="small" style="width:350px">
              <el-input type="textarea" :rows="2" placeholder="请输入驳回意见" v-model="shiptabForm.Comments" style="width:460px"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="rejectFormDialogVisible = false; checkList = []" type="primarydel">取 消</el-button>
          <span class="" style="margin-left: 10px;">
            <el-button size="small" @click="rejectSubmit(3)" type="primary">驳 回</el-button>
          </span>
        </span>
      </el-dialog>
      <div class="hdp-uf hdp-w-100" style="margin-top:10px">
        <el-table :data="shiptablist" stripe border :row-style="rowStyle">
          <el-table-column prop="DepartmentName" label="井站" width="110">
          </el-table-column>
          <el-table-column prop="PlaceName" label="卸载地" width="95">
          </el-table-column>
          <!-- <el-table-column prop="PlaceName" label="日期" width="85">
            <template slot-scope="scope">
              <span>{{scope.row.Date.substr(0,10)}}</span>
            </template>
          </el-table-column> -->
          <el-table-column prop="CarNo" label="车牌" width="90">
          </el-table-column>
          <el-table-column prop="DriverName" label="驾驶员" width="70">
          </el-table-column>
          <el-table-column prop="AddTime" width="120">
            <template slot="header" slot-scope="scope">
              <a v-if="spanSort === 1" class="el-link el-link--primary is-underline" @click="Sort1click(1)">
                <i class="el-icon-download"></i>
                <span class="el-link--inner">录入时间</span>
              </a>
              <a v-if="spanSort === 0 || spanSort === 2" class="el-link el-link--primary2 is-underline2" @click="Sort1click(0)">
                <i class="el-icon-download"></i>
                <span class="el-link--inner">录入时间</span>
              </a>
            </template>
            <template slot-scope="scope">
              <span v-if="scope.row.AddTime === ''"></span>
              <span v-else>{{scope.row.AddTime.substr(0,10) + ' ' + scope.row.AddTime.substr(11,5)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="LeaveTime" width="120">
            <template slot="header" slot-scope="scope">
              <a v-if="spanSort === 2" class="el-link el-link--primary is-underline" @click="Sort2click(2)">
                <i class="el-icon-download"></i>
                <span class="el-link--inner">离站时间</span>
              </a>
              <a v-if="spanSort === 0 || spanSort === 1" class="el-link el-link--primary2 is-underline2" @click="Sort2click(0)">
                <i class="el-icon-download"></i>
                <span class="el-link--inner">离站时间</span>
              </a>
            </template>
            <template slot-scope="scope">
              <span v-if="scope.row.LeaveTime === ''"></span>
              <span v-else>{{scope.row.LeaveDate ? scope.row.LeaveDate.substr(0,10) + ' ' + scope.row.LeaveTime : scope.row.Date.substr(0,10) + ' ' + scope.row.LeaveTime}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="TargetTime" label="到达" width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.TargetTime === ''"></span>
              <span v-else>{{scope.row.TargetDate.substr(0,10) + ' ' + scope.row.TargetTime}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="ShipMinute" label="在途" width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.ShipMinute === 0"></span>
              <span v-else>{{minuteToTime(scope.row.ShipMinute)}}</span>
            </template>
          </el-table-column>
          <el-table-column v-if="shiptabForm.carType.CarType === '1'" prop="RealWeight" label="实收(吨)" width="70">
          </el-table-column>
          <el-table-column v-else-if="shiptabForm.carType.CarType === '2'" prop="TotalWater" label="签单量(方)" width="80">
          </el-table-column>
          <el-table-column v-if="shiptabForm.carType.CarType === '2'" label="拉运类型" width="70">
            <template slot-scope="scope">
              <span v-if="scope.row.WaterType === 3">气田水</span>
              <span v-else-if="scope.row.WaterType === 4">方井水</span>
              <span v-else-if="scope.row.WaterType === 5">清水</span>
              <span v-else-if="scope.row.WaterType === 6">返空</span>
              <span v-else-if="scope.row.WaterType === 7">值班</span>
            </template>
          </el-table-column>
          <el-table-column prop="Status" label="状态" width="85">
            <template slot-scope="scope">
              <span v-if="scope.row.Status === 1" style="color:#409EFF">已出站</span>
              <span v-else-if="scope.row.Status === 0" style="color:#409EFF">待提交</span>
              <span v-else-if="scope.row.Status === 2" style="color:#409EFF">待审核</span>
              <span v-else-if="scope.row.Status === 3">
                <span v-if="scope.row.AuditType === 1" style="color:#f56c6c">待审(井)</span>
                <span v-else-if="scope.row.AuditType === 2" style="color:#f56c6c">待审(验)</span>
                <span v-else-if="scope.row.AuditType === 0">
                  <span v-if="scope.row.RejectType === 1" style="color:#f56c6c">驳回(井)</span>
                  <span v-else-if="scope.row.RejectType === 2" style="color:#f56c6c">驳回(验)</span>
                  <span v-else-if="scope.row.RejectType === 3" style="color:#f56c6c">驳回(同时)</span>
                </span>
              </span>
              <span v-else-if="scope.row.Status === 4" style="color:#67c23a">已完成</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button v-if="(identity.Identity === '81' && scope.row.Status === 0)" @click.native.prevent="deleteRow(scope.$index, shiptablist)" type="primarydel" size="small" style="color: #ff7e33 !important;border-color: #ff7e33 !important;background-color: #ecf5ff;">
                删除
              </el-button>
              <el-button v-if="(scope.row.Status === 0 && identity.Identity === '81')
               /* || (scope.row.Status === 2 && identity.Identity === '83') */
               /* || (scope.row.Status === 3 && identity.Identity === '81') */
               || ((scope.row.RejectType === 1 || scope.row.RejectType === 3) && scope.row.Status === 3 && identity.Identity === '81' && scope.row.AuditType !== 1)
               || (scope.row.Status === 1 && identity.Identity === '82')
               || ((scope.row.RejectType === 2 || scope.row.RejectType === 3) && scope.row.Status === 3 && identity.Identity === '82' && scope.row.AuditType !== 2)
               || (scope.row.Status === 4 && identity.Identity === '84' && noShowRightinclud91 === 'true')" @click.native.prevent="updateRow(scope.$index, shiptablist)" type="primary" size="small">
                编辑
              </el-button>
              <!-- <el-button v-if="(scope.row.Status === 2 && identity.Identity === '83')" @click.native.prevent="reject(scope.$index, shiptablist)" type="primary" size="small">
                驳回
              </el-button> -->
              <el-button v-else-if="(identity.Identity !== '83' || scope.row.Status === 4)" @click.native.prevent="viewdetails(scope.row.Status, scope.$index, shiptablist)" type="primarydel" size="small">
                查看
              </el-button>
              <el-button v-else-if="(identity.Identity === '83' && scope.row.Status !== 2)" @click.native.prevent="viewdetails(scope.row.Status, scope.$index, shiptablist)" type="primarydel" size="small">
                查看
              </el-button>
              <el-button v-if="(scope.row.Status === 2 && identity.Identity === '83')" @click.native.prevent="viewdetails(scope.row.Status, scope.$index, shiptablist)" type="primary" size="small">
                审查
              </el-button>
              <!-- <el-button v-if="(scope.row.Status === 3 && identity.Identity === '83' && scope.row.RejectType === 0 && shiptabForm.carType.CarType === '1')" @click.native.prevent="viewdetails(scope.row.Status, scope.$index, shiptablist)" type="primary" size="small">
                审查
              </el-button> -->
              <el-button  v-if="(scope.row.Status === 4 && (identity.Identity === '83' || identity.Identity === '84'))" @click.native.prevent="hiscirculate(scope.$index, shiptablist)" type="primarydel" size="small">
                流程
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-dialog :close-on-click-modal="false" title="历史流转" :visible.sync="hiscirculateTableDialogVisible" v-if="hiscirculateTableDialogVisible" @close="viewdetailsclose" width="1000px">
        <div class="dialog-content">
          <el-table :data="hiscirculatelist" stripe border :row-style="rowStyle">
            <el-table-column prop="NickName" label="用户名" width="140">
            </el-table-column>
            <el-table-column prop="AddTime" label="时间" width="160">
              <template slot-scope="scope">
                <span>{{scope.row.AddTime.substr(0,10) + ' ' + scope.row.AddTime.substr(11,5)}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="IPAddress" label="IP地址" width="140">
            </el-table-column>
            <el-table-column prop="Status" label="流程节点" width="140">
              <template slot-scope="scope">
                <span v-if="scope.row.Status === 1" style="color:#409EFF">已出站</span>
                <span v-else-if="scope.row.Status === 0" style="color:#409EFF">待提交</span>
                <span v-else-if="scope.row.Status === 2" style="color:#409EFF">待审核</span>
                <span v-else-if="scope.row.Status === 3" style="color:#f56c6c">已驳回</span>
                <span v-else-if="scope.row.Status === 4" style="color:#67c23a">已完成</span>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作">
              <template slot-scope="scope">
                <el-button  @click.native.prevent="Recorddetail(scope.$index, hiscirculatelist)" type="primarydel" size="small">
                  详情
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="hiscirculateTableDialogVisible = false; checkList = []" type="primarydel">取 消</el-button>
          <!-- <span class="" style="margin-left: 10px;">
            <el-button size="small" @click="" type="primary">驳 回</el-button>
          </span> -->
        </span>
      </el-dialog>
      <el-dialog :close-on-click-modal="false" title="详细信息" :visible.sync="recorddetailDialogVisible" v-if="recorddetailDialogVisible" @close="viewdetailsclose" width="1200px">
        <div class="dialog-content">
          <el-form ref="shiptabForm" :inline="true" :model="shiptabForm" label-width="150px">
            <div class="" style="width:724px;display: inline-block;">
              <el-form-item label="井站" prop="DepartmentId" style="width: 350px">
                <el-select v-model="shiptabForm.tranStation.DepartmentId" size="small" :disabled="true" placeholder="请选择">
                  <el-option v-for="item in shiptabForm.tranStation.tranStationlist" :key="item.DepartmentId" :label="item.DepartmentName" :value="item.DepartmentId"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="卸载地" prop="ShipPlaceId" style="width: 350px">
                <el-select v-model="shiptabForm.shipplace.ShipPlaceId" size="small" :disabled="true" placeholder="请选择">
                  <el-option v-for="item in shiptabForm.shipplace.shipplacelist" :key="item.ID" :label="item.Place" :value="item.ID"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item v-if="shiptabForm.carType.CarType === '2'" label="拉运类型" prop="WaterType" style="width: 350px">
                <el-select v-model="shiptabForm.waterType.WaterType" size="small" :disabled="true" @change="WaterTypechange" placeholder="请选择">
                  <el-option key="3" label="气田水" value="3"></el-option>
                  <el-option key="4" label="方井水" value="4"></el-option>
                  <el-option key="5" label="清水" value="5"></el-option>
                  <el-option key="6" label="返空" value="6"></el-option>
                  <el-option key="7" label="值班" value="7"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item v-if="shiptabForm.carType.CarType === '1'" label="" prop="" style="width: 350px">
                <!-- 占位 -->
              </el-form-item>
              <el-form-item label="进站日期" prop="Date" style="width: 350px">
                <el-date-picker v-model="shiptabForm.datetime.Date" type="date" size="small" :disabled="true" placeholder="选择日期" :picker-options="pickerOptions1">></el-date-picker>
              </el-form-item>
              <el-form-item v-if="shiptabForm.carType.CarType === '2' && shiptabForm.waterType.WaterType !== '3'" label="进站时间" prop="ArrivalTime" style="width: 350px">
                <el-time-picker v-model="shiptabForm.datetime.ArrivalTime" format="HH:mm" @blur="setstartime" size="small" disabled></el-time-picker>
              </el-form-item>
              <el-form-item v-else label="进站时间" prop="ArrivalTime" style="width: 350px">
                <el-time-picker v-model="shiptabForm.datetime.ArrivalTime" format="HH:mm" @blur="setstartime" size="small" :disabled="true"></el-time-picker>
              </el-form-item>
              <el-form-item label="出站日期" prop="LeaveDate" style="width: 350px">
                <el-date-picker v-model="shiptabForm.datetime.LeaveDate" type="date" size="small" :disabled="identity.TranStation_disabled" placeholder="选择日期" :picker-options="pickerOptions2" :clearable="false"></el-date-picker>
              </el-form-item>
              <el-form-item v-if="shiptabForm.carType.CarType === '2' && shiptabForm.waterType.WaterType !== '3'" label="出站时间" prop="LeaveTime" style="width: 350px">
                <el-time-picker v-model="shiptabForm.datetime.LeaveTime" :picker-options="shiptabForm.datetime.pickeroptions"  @blur="timerDiff" format="HH:mm" size="small" disabled></el-time-picker>
              </el-form-item>
              <el-form-item v-else label="出站时间" prop="LeaveTime" style="width: 350px">
                <el-time-picker v-model="shiptabForm.datetime.LeaveTime" :picker-options="shiptabForm.datetime.pickeroptions"  @blur="timerDiff" format="HH:mm" size="small" :disabled="true"></el-time-picker>
              </el-form-item>
              <el-form-item label="运单号" prop="OrderNo" size="small" style="width:350px">
                <el-input v-model="shiptabForm.OrderNo" :disabled="true" @mousewheel.native.prevent></el-input>
              </el-form-item>
              <el-form-item label="车牌号" prop="CarNo" style="width: 350px">
                <el-select v-model="shiptabForm.truck.CarNo" size="small" filterable @change="gettruckinform" @blur="calDiffWeight" :disabled="true" placeholder="请选择">
                  <el-option v-for="item in shiptabForm.truck.trucklist" :key="item.ID" :label="item.CarNo" :value="item.CarNo"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="驾驶员" prop="DriverId" style="width: 350px">
                <el-select v-model="shiptabForm.driver.DriverId" size="small" filterable @change="getdriverinform" :disabled="true" placeholder="请选择">
                  <el-option v-for="item in shiptabForm.driver.driverlist" :key="item.ID" :label="item.DriverName" :value="item.ID"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div id='picDcm' class="" style="width:360px;display: inline;">
              <el-form-item label="运单图片" prop="ImagePath" size="small" style="width:350px">
                <!-- <el-upload style="width:350px" :file-list="ImagePathlist" :disabled="identity.centraldisabled"
                  :action="uploadip" :limit="1" list-type="picture-card"
                  :on-preview="handlePictureCardPreview" :on-remove="handleRemove"
                  :on-exceed="handleExceed"
                  :on-success="handleSuccess" :on-error="handleError">
                  <i class="el-icon-plus"></i>
                </el-upload> -->
                <el-upload
                  class="avatar-uploader" style="width:175px"
                  :action="uploadip" :show-file-list="false"
                  :on-success="handleSuccess"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </div>
            <!-- <el-form-item v-if="shiptabForm.carType.CarType === '1'" label="铅封号" prop="SealNo" size="small" style="width:1160px;" id="tag-el-form-item__content">
              <div class="" style="width:1040px">
                <el-tag :key="tag" v-for="tag in dynamicTags" :closable="!true" :disable-transitions="true" @close="handleClose(tag)">{{tag}}</el-tag>
                <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" maxlength="6" ref="saveTagInput" size="small" :disabled="true" @keyup.enter.native="handleInputConfirm"  @blur="handleInputConfirm"></el-input>
                <el-button v-else class="button-new-tag" size="small" type="primarydel" :disabled="true" @click="showInput">+铅封({{shiptabForm.sealNum}}个)</el-button>
              </div>
            </el-form-item> -->
            <el-form-item v-if="shiptabForm.carType.CarType === '2'" label="水罐1      液位计故障" prop="Invalid1" size="small" style="width:350px">
              <el-radio v-model="shiptabForm.Invalid1" :disabled="true" label="1" style="margin-left:10px">是</el-radio>
              <el-radio v-model="shiptabForm.Invalid1" :disabled="true" label="0">否</el-radio>
            </el-form-item>
            <el-form-item v-if="shiptabForm.carType.CarType === '2'" label="水罐2      液位计故障" prop="Invalid1" size="small" style="width:350px">
              <el-radio v-model="shiptabForm.Invalid2" :disabled="true" label="1" style="margin-left:10px">是</el-radio>
              <el-radio v-model="shiptabForm.Invalid2" :disabled="true" label="0">否</el-radio>
            </el-form-item>
            <el-form-item v-if="shiptabForm.carType.CarType === '2'" label="" prop="" style="width: 350px">
              <!-- 占位 -->
            </el-form-item>
            <el-form-item v-if="shiptabForm.carType.CarType === '2'" :inline="true" label="水罐1      拉前" prop="Height" size="small" style="width: 350px">
              <div class="hdp-uf hdp-uf-hc">
                <!-- 拉前液位(cm) -->
                <el-input v-if="shiptabForm.Invalid1 === '1'" style="width: 45%" placeholder="液位(cm)" v-model="shiptabForm.HeightFront" :disabled="identity.Oilinspd_disabled" @blur="waterHeightBack" @mousewheel.native.prevent></el-input>
                <el-input v-else-if="shiptabForm.waterType.WaterType === '3'" type="number" style="width: 45%" placeholder="液位(cm)" v-model="shiptabForm.HeightFront" :disabled="identity.Oilinspd_disabled" @blur="waterHeightBack" @mousewheel.native.prevent></el-input>
                <el-input v-else type="number" style="width: 45%" placeholder="液位(cm)" v-model="shiptabForm.HeightFront" disabled @blur="waterHeightBack" @mousewheel.native.prevent></el-input>
                <div class="hdp-uf hdp-uf-hc" style="width: 10%">/</div>
                <el-input v-if="shiptabForm.waterType.WaterType === '3'" type="number" style="width: 45%" placeholder="液量(方)" v-model="shiptabForm.Weight" @blur="calWaterNum" :disabled="identity.Oilinspd_disabled" @mousewheel.native.prevent></el-input>
                <el-input v-else type="number" style="width: 45%" placeholder="液量(方)" v-model="shiptabForm.Weight" @blur="calWaterNum" disabled @mousewheel.native.prevent></el-input>
              </div>
            </el-form-item>
            <el-form-item v-if="shiptabForm.carType.CarType === '2'" :inline="true" label="拉后" size="small" style="width: 350px">
              <div class="hdp-uf hdp-uf-hc">
                <!-- 拉后液位(cm) -->
                <el-input v-if="shiptabForm.waterType.WaterType === '3'" type="number" style="width: 45%" placeholder="液位(cm)" v-model="shiptabForm.RealHeightFront" :disabled="true" @mousewheel.native.prevent></el-input>
                <el-input v-else type="number" style="width: 45%" placeholder="液位(cm)" v-model="shiptabForm.RealHeightFront" disabled @mousewheel.native.prevent></el-input>
                <div class="hdp-uf hdp-uf-hc" style="width: 10%">/</div>
                <el-input v-if="shiptabForm.waterType.WaterType === '3'" type="number" style="width: 45%" placeholder="液量(方)" v-model="shiptabForm.RealWeight" @blur="calWaterNum" :disabled="true" @mousewheel.native.prevent></el-input>
                <el-input v-else type="number" style="width: 45%" placeholder="液量(方)" v-model="shiptabForm.RealWeight" @blur="calWaterNum" disabled @mousewheel.native.prevent></el-input>
              </div>
            </el-form-item>
            <el-form-item v-if="shiptabForm.carType.CarType === '2'" :inline="true" label="水量" prop="RealWeight" size="small" style="width: 350px">
              <div class="hdp-uf hdp-uf-hc">
                <el-input v-if="shiptabForm.Invalid1 === '0'" type="number" :disabled="true" readonly="readonly" placeholder="水量(方)" v-model="shiptabForm.WaterNumOne" @mousewheel.native.prevent></el-input>
                <el-input v-else type="number" placeholder="水量(方)" v-model="shiptabForm.WaterNumOne" @mousewheel.native.prevent></el-input>
              </div>
            </el-form-item>

            <el-form-item v-if="shiptabForm.carType.CarType === '2'" :inline="true" label="水罐2        拉前" prop="Height" size="small" style="width: 350px">
              <div class="hdp-uf hdp-uf-hc" >
                <el-input type="number" style="width: 45%" placeholder="液位(cm)" v-if="!(shiptabForm.HeightFront > 0)" v-model="shiptabForm.HeightBack" @blur="waterHeightBack" disabled @mousewheel.native.prevent></el-input>
                <el-input type="number" style="width: 45%" placeholder="液位(cm)" v-else v-model="shiptabForm.HeightBack" @blur="waterHeightBack" :disabled="true" @mousewheel.native.prevent></el-input>
                <div class="hdp-uf hdp-uf-hc" style="width: 10%">/</div>
                <el-input type="number" style="width: 45%" placeholder="液量(方)" v-if="!(shiptabForm.HeightBack > 0)" v-model="shiptabForm.WeightTwo" @blur="calWaterNum" disabled @mousewheel.native.prevent></el-input>
                <el-input type="number" style="width: 45%" placeholder="液量(方)" v-else v-model="shiptabForm.WeightTwo" @blur="calWaterNum" :disabled="true" @mousewheel.native.prevent></el-input>
              </div>
            </el-form-item>
            <el-form-item v-if="shiptabForm.carType.CarType === '2'" :inline="true" label="拉后" size="small" style="width: 350px">
              <div class="hdp-uf hdp-uf-hc">
                <el-input type="number" style="width: 45%" placeholder="液位(cm)" v-if="!(shiptabForm.HeightBack > 0)" v-model="shiptabForm.RealHeightBack" disabled @mousewheel.native.prevent></el-input>
                <el-input type="number" style="width: 45%" placeholder="液位(cm)" v-else v-model="shiptabForm.RealHeightBack" :disabled="true" @mousewheel.native.prevent></el-input>
                <div class="hdp-uf hdp-uf-hc" style="width: 10%">/</div>
                <el-input type="number" style="width: 45%" placeholder="液量(方)" v-if="!(shiptabForm.HeightBack > 0)" v-model="shiptabForm.RealWeightTwo" @blur="calWaterNum" disabled @mousewheel.native.prevent></el-input>
                <el-input type="number" style="width: 45%" placeholder="液量(方)" v-else v-model="shiptabForm.RealWeightTwo" @blur="calWaterNum" :disabled="true" @mousewheel.native.prevent></el-input>
              </div>
            </el-form-item>
            <el-form-item v-if="shiptabForm.carType.CarType === '2'" :inline="true" label="水量" prop="RealWeight" size="small" style="width: 350px">
              <div class="hdp-uf hdp-uf-hc">
                <el-input v-if="shiptabForm.Invalid2 === '0'" type="number" :disabled="true" readonly="readonly" placeholder="水量(方)" v-model="shiptabForm.WaterNumTwo" @mousewheel.native.prevent></el-input>
                <el-input v-else type="number" placeholder="水量(方)" v-model="shiptabForm.WaterNumTwo" @mousewheel.native.prevent></el-input>
              </div>
            </el-form-item>
            <el-form-item v-if="shiptabForm.carType.CarType === '2'" label="签认人" size="small" style="width: 350px">
              <el-input v-model="shiptabForm.signer.SignerName" :disabled="true" @mousewheel.native.prevent></el-input>
            </el-form-item>
            <el-form-item v-if="shiptabForm.carType.CarType === '2'" label="补水量(方)" prop="WaterAdd" size="small" style="width:350px">
              <el-input type="number" v-model="shiptabForm.WaterAdd" @blur="calTotalWater" @mousewheel.native.prevent :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item v-if="shiptabForm.carType.CarType === '2'" label="签单量(方)" prop="TotalWater" size="small" style="width:350px">
              <el-input type="number"  v-model="shiptabForm.TotalWater" @mousewheel.native.prevent :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item v-if="shiptabForm.carType.CarType === '2'" label="记录人" size="small" style="width: 350px">
              <el-input v-model="shiptabForm.recorder.RecorderName" :disabled="true" @mousewheel.native.prevent></el-input>
            </el-form-item>
            <el-form-item v-if="shiptabForm.carType.CarType === '1'" label="油罐1      液位计故障" prop="Invalid1" size="small" style="width:350px">
              <el-radio v-model="shiptabForm.Invalid1" :disabled="true" label="1" style="margin-left:10px">是</el-radio>
              <el-radio v-model="shiptabForm.Invalid1" :disabled="true" label="0">否</el-radio>
            </el-form-item>
            <el-form-item v-if="shiptabForm.carType.CarType === '1'" label="拉前液位" prop="Weight" size="small" style="width:350px">
              <el-input v-if="shiptabForm.Invalid1 === '1'" type="number" v-model="shiptabForm.OilLevBefore1" disabled @mousewheel.native.prevent @input="calDiffWeight"></el-input>
              <el-input v-else type="number" v-model="shiptabForm.OilLevBefore1" :disabled="true" @mousewheel.native.prevent @input="calDiffWeight"></el-input>
            </el-form-item>
            <el-form-item v-if="shiptabForm.carType.CarType === '1'" label="拉后液位" prop="Weight" size="small" style="width:350px">
              <el-input v-if="shiptabForm.Invalid1 === '1'" type="number" v-model="shiptabForm.OilLevAfter1" disabled @mousewheel.native.prevent @input="calDiffWeight"></el-input>
              <el-input v-else type="number" v-model="shiptabForm.OilLevAfter1" :disabled="true" @mousewheel.native.prevent @input="calDiffWeight"></el-input>
            </el-form-item>
            <el-form-item v-if="shiptabForm.carType.CarType === '1'" label="油罐2      液位计故障" prop="Invalid2" size="small" style="width:350px">
              <el-radio v-model="shiptabForm.Invalid2" :disabled="true" label="1" style="margin-left:10px">是</el-radio>
              <el-radio v-model="shiptabForm.Invalid2" :disabled="true" label="0">否</el-radio>
            </el-form-item>
            <el-form-item v-if="shiptabForm.carType.CarType === '1'" label="拉前液位" prop="Weight" size="small" style="width:350px">
              <el-input v-if="shiptabForm.Invalid2 === '1'" type="number" v-model="shiptabForm.OilLevBefore2" disabled @mousewheel.native.prevent @input="calDiffWeight"></el-input>
              <el-input v-else type="number" v-model="shiptabForm.OilLevBefore2" :disabled="true" @mousewheel.native.prevent @input="calDiffWeight"></el-input>
            </el-form-item>
            <el-form-item v-if="shiptabForm.carType.CarType === '1'" label="拉后液位" prop="Weight" size="small" style="width:350px">
              <el-input v-if="shiptabForm.Invalid2 === '1'" type="number" v-model="shiptabForm.OilLevAfter2" disabled @mousewheel.native.prevent @input="calDiffWeight"></el-input>
              <el-input v-else type="number" v-model="shiptabForm.OilLevAfter2" :disabled="true" @mousewheel.native.prevent @input="calDiffWeight"></el-input>
            </el-form-item>
            <el-form-item v-if="shiptabForm.carType.CarType === '1'" :inline="true" label="核定空高(cm)" prop="Height" size="small" style="width: 350px">
              <div class="hdp-uf hdp-uf-hc">
                <el-input type="number" style="width: 45%" placeholder="前" :disabled="true" readonly="readonly" v-model="shiptabForm.HeightFront" @mousewheel.native.prevent></el-input>
                  <div class="hdp-uf hdp-uf-hc" style="width: 10%">/</div>
                <el-input type="number" style="width: 45%" placeholder="后" :disabled="true" readonly="readonly" v-model="shiptabForm.HeightBack" @mousewheel.native.prevent></el-input>
              </div>
            </el-form-item>
            <el-form-item v-if="shiptabForm.carType.CarType === '1'" label="核定重量(t)" prop="Weight" size="small" style="width:350px">
              <el-input type="number" v-model="shiptabForm.Weight" :disabled="true" readonly="readonly" @mousewheel.native.prevent @input="calDiffWeight"></el-input>
            </el-form-item>
            <el-form-item v-if="shiptabForm.carType.CarType === '1'" :inline="true" label="井站实测空高(cm)" prop="WellHeight" size="small" style="width: 350px">
              <div class="hdp-uf hdp-uf-hc">
                <el-input type="number" style="width: 45%" placeholder="前" v-model="shiptabForm.WellHeightFront" :disabled="true" @mousewheel.native.prevent></el-input>
                  <div class="hdp-uf hdp-uf-hc" style="width: 10%">/</div>
                <el-input type="number" style="width: 45%" placeholder="后" v-if="shiptabForm.HeightBack === 0" v-model="shiptabForm.WellheightBack" disabled @mousewheel.native.prevent></el-input>
                <el-input type="number" style="width: 45%" placeholder="后" v-else v-model="shiptabForm.WellheightBack" :disabled="true" @mousewheel.native.prevent></el-input>
              </div>
            </el-form-item>
            <el-form-item v-if="shiptabForm.carType.CarType === '1'" :inline="true" label="验油班实测空高(cm)" size="small" style="width: 350px">
              <div class="hdp-uf hdp-uf-hc">
                <el-input type="number" style="width: 45%" placeholder="前" v-model="shiptabForm.RealHeightFront" :disabled="true" @mousewheel.native.prevent></el-input>
                  <div class="hdp-uf hdp-uf-hc" style="width: 10%">/</div>
                <el-input type="number" style="width: 45%" placeholder="后" v-if="shiptabForm.HeightBack === 0" v-model="shiptabForm.RealHeightBack" disabled @mousewheel.native.prevent></el-input>
                <el-input type="number" style="width: 45%" placeholder="后" v-else v-model="shiptabForm.RealHeightBack" :disabled="true" @mousewheel.native.prevent></el-input>
              </div>
            </el-form-item>
            <el-form-item v-if="shiptabForm.carType.CarType === '1'" label="实收重量(t)" prop="RealWeight" size="small" style="width:350px">
              <el-input type="number" v-model="shiptabForm.RealWeight" @mousewheel.native.prevent  @blur="calDiffWeight" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item v-if="shiptabForm.carType.CarType === '1'" label="运差(t)" prop="DiffWeight" size="small" style="width:350px">
              <el-input type="number" :disabled="true" readonly="readonly"  v-model="shiptabForm.DiffWeight" @mousewheel.native.prevent></el-input>
            </el-form-item>
            <el-form-item v-if="shiptabForm.carType.CarType === '1'" label="油密度(吨/方)" prop="Density" size="small" style="width:350px">
              <el-input type="number" v-model="shiptabForm.Density" @mousewheel.native.prevent :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item v-if="shiptabForm.carType.CarType === '1'" label="单车含水(t)" prop="WaterAdd" size="small" style="width:350px">
              <el-input type="number" v-model="shiptabForm.WaterAdd" @mousewheel.native.prevent :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item v-if="shiptabForm.carType.CarType === '1'" label="呼吸阀异常" prop="IsNormal" size="small" style="width:350px">
              <el-radio v-model="shiptabForm.IsNormal" :disabled="true" label="1" style="margin-left:10px">是</el-radio>
              <el-radio v-model="shiptabForm.IsNormal" :disabled="true" label="0">否</el-radio>
            </el-form-item>
            <!-- :disabled="true" readonly="readonly" -->
            <el-form-item label="到达日期" prop="TargetDate" style="width: 350px">
              <el-date-picker v-model="shiptabForm.datetime.TargetDate" type="date" size="small" :disabled="true" placeholder="选择日期" :picker-options="pickerOptions1">></el-date-picker>
            </el-form-item>
            <el-form-item label="到达时间" prop="TargetTime" style="width: 350px">
              <el-time-picker v-model="shiptabForm.datetime.TargetTime" format="HH:mm"  @blur="timerDiff" size="small" :disabled="true" ></el-time-picker>
            </el-form-item>
            <el-form-item label="在途时间(分钟)" size="small" style="width:350px">
              <el-input type="text" :disabled="true" readonly="readonly" v-model="shiptabForm.datetime.shipMinuteStr" @mousewheel.native.prevent></el-input>
            </el-form-item>
            <el-form-item v-if="shiptabForm.carType.CarType === '1'" label="记录人" size="small" style="width: 350px">
              <el-input v-model="shiptabForm.recorder.RecorderName" :disabled="true" @mousewheel.native.prevent></el-input>
            </el-form-item>
            <el-form-item v-if="shiptabForm.carType.CarType === '1'" label="签认人" size="small" style="width: 350px">
              <el-input v-model="shiptabForm.signer.SignerName" :disabled="true" @mousewheel.native.prevent></el-input>
            </el-form-item>
            <el-form-item v-if="shiptabForm.carType.CarType === '2'" label="" prop="" style="width: 350px">
              <!-- 占位 -->
            </el-form-item>
            <el-form-item label="井站备注" size="small" style="width:700px">
              <el-input type="text" v-model="shiptabForm.Notes" :disabled="true" @mousewheel.native.prevent style="width:537px"></el-input>
            </el-form-item>
            <el-form-item v-if="this.shiptabForm.carType.CarType === '1'" label="验油班备注" size="small" style="width:700px">
              <el-input type="text" v-model="shiptabForm.Notes2" :disabled="true" @mousewheel.native.prevent style="width:537px"></el-input>
            </el-form-item>
            <el-form-item v-if="this.shiptabForm.Comments" label="驳回意见" size="small" style="width:700px">
              <el-input type="text" v-model="shiptabForm.Comments" disabled @mousewheel.native.prevent style="width:537px"></el-input>
            </el-form-item>
            <el-form-item v-if="this.shiptabForm.Remark !==''" label="异常情况" prop="TotalWater" size="small" style="width:700px">
              <el-input type="text" :disabled="true" readonly="readonly" v-model="shiptabForm.Remark" @mousewheel.native.prevent style="width:537px"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="recorddetailDialogVisible = false" type="primarydel">取 消</el-button>
        </span>
      </el-dialog>
      <div v-if="this.shiptabForm.carType.CarType === '1'" class="hdp-uf hdp-w-90" style="margin-top:15px">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagination.currentPage" :page-sizes="pagination.pagesizes" :page-size="pagination.pagesize" layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.totalNum">
        </el-pagination>
      </div>
      <div v-else-if="this.shiptabForm.carType.CarType === '2'" class="hdp-uf hdp-w-90" style="margin-top:15px">
        <el-pagination @size-change="handleSizeChange2" @current-change="handleCurrentChange2" :current-page="pagination2.currentPage" :page-sizes="pagination2.pagesizes" :page-size="pagination2.pagesize" layout="total, sizes, prev, pager, next, jumper"
          :total="pagination2.totalNum">
        </el-pagination>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import config from '../../config/config.js'
import commonFunc from '../../api/common/common.js'
import shiptabApi from '../../api/shiptab.js'
import shipplaceApi from '../../api/shipplace.js'
import tranStationApi from '../../api/tranStation.js'
import departmentApi from '../../api/department.js'
import tagsApi from '../../api/tags.js'
import driversApi from '../../api/drivers.js'
import trucksApi from '../../api/trucks.js'
import signerApi from '../../api/signer.js'
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
      dialogVisible: false,
      datepickervalue: [commonFunc.getnowDate(new Date(), -30), commonFunc.getnowDate(new Date(), 0)], // 时间段选择
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      pickerOptions2: {
        disabledDate(time) {
          return time.getTime() < Date.now() || time.getTime() > Date.now()
        }
      },
      search: {
        'TagId': '',
        'Tag_DepartmentId': '',
        'selectedTagsOptions': [],
        'selectedwellOptions': [],
        'DepartmentId': '', // 部门id
        'DepartmentLev': '', // 部门层级
        'DepartmentName': '' // 部门名称
      },
      departmentwelllist: [], // 处理前 接口返回的 的部门 数据结构
      departwellcenterProps: {
        expandTrigger: 'hover',
        value: 'ID', // value="ParentID"
        label: 'DepartmentName',
        children: 'SubDeps'
      },
      departwellcenterlist: [], // 处理后的部门 数据结构

      Tagslist: [], // 处理前 接口返回的 的部门 数据结构
      TagsProps: {
        expandTrigger: 'hover',
        checkStrictly: true,
        value: 'TagId', // value="ParentID"
        label: 'TagName',
        children: 'ListDepartment'
      },
      TagsArrlist: [], // 处理后的部门 数据结构

      dynamicTags: [], // tag标签 字段
      inputVisible: false, // tag标签 字段
      inputValue: '', // tag标签 字段
      activeName: '1',
      shiptabFormDialogVisible: false,
      rejectFormDialogVisible: false,
      checkList: [],
      hiscirculateTableDialogVisible: false,
      hiscirculatelist: [],
      recorddetailDialogVisible: false,
      identity: {
        Identity: '81',
        TranStation_disabled: true,
        Oilinspd_disabled: false
      },
      IsToCheck: '1', // 区分 判断 彭州石化0 等  无验油班  情况    直接提交至审核
      Isdetailsview: '0',
      shiptabForm: {
        ID: '',
        datetime: {
          'pickeroptions': { // !!!!!!!!!!!!!!
            selectableRange: '00:00:01 - 23:59:59'
          },
          'Date': new Date(),
          'LeaveDate': new Date(),
          'ArrivalTime': '',
          'LeaveTime': '',
          'TargetTime': '',
          'TargetDate': new Date(),
          'shipMinuteStr': '', // !!!!!!!!!!!!!!
          'ShipMinute': ''
        },
        tranStation: {
          'tranStationlist': [], // !!!!!!!!!!!!!!
          'DepartmentId': '',
          'DepartmentLev': '',
          'DepartmentName': ''
        },
        shipplace: {
          'shipplacelist': [], // !!!!!!!!!!!!!!
          'ShipPlaceId': '',
          'PlaceName': ''
        },
        driver: {
          'driverlist': [], // !!!!!!!!!!!!!!
          'DriverId': '',
          'DriverName': ''
        },
        truck: {
          'trucklist': [], // !!!!!!!!!!!!!!
          'truckId': '',
          'CarNo': ''
        },
        carType: {
          'CarType': '1'
        },
        waterType: {
          'WaterType': ''
        },
        signer: {
          'signerlist': [], // !!!!!!!!!!!!!!
          'SignerId': '',
          'SignerName': ''
        },
        recorder: {
          'RecorderId': '',
          'RecorderName': ''
        },
        'OrderNo': '', // 运单号
        'ImgPath': '', // 图片
        'sealNum': '', // 铅封最大个数
        'SealNo': '', // 铅封号以/隔开
        'HeightFront': '', // 核定空高-前(油车)/拉前液位1（水车）
        'HeightBack': '', // 核定空高-后(油车)/拉前液位2（水车）
        'Weight': '', // 核定重量（油车）/拉前水罐液量（水车）
        'WeightTwo': '', // 核定重量（油车）/拉前水罐液量（水车）
        'WellHeightFront': '', // 井站实测空高-前
        'WellheightBack': '', // 井站实测空高-后
        'RealHeightFront': '', // 验油班实测空高-前(油车)/拉后液位1（水车）
        'RealHeightBack': '', // 验油班实测空高-后(油车)/拉后液位2（水车）
        'RealWeight': '', // 实收重量(油车)/拉后水罐液量（水车）
        'RealWeightTwo': '', // 实收重量(油车)/拉后水罐液量（水车）
        'DiffWeight': '', // 运差（油车RealWeight - Weight）
        'Density': '', // 油密度
        'WaterNumOne': '', // 水罐水量1（水车）
        'WaterNumTwo': '', // 水罐水量2（水车）
        'WaterAdd': '', // 单车含水（油车）/补水量（水车）
        'TotalWater': '', // 签单量（=水罐水量+补水量）
        'IsNormal': '0', // 呼吸阀是否正常（0否1是，油车）
        'Invalid1': '0', // 液位计是否故障（0正常 1故障，油车）
        'Invalid2': '0', // 液位计是否故障（0正常 1故障，油车）
        'OilLevBefore1': '', // 拉前液位 油车   罐1
        'OilLevAfter1': '', // 拉后液位 油车   罐1
        'OilLevBefore2': '', // 拉前液位 油车   罐2
        'OilLevAfter2': '', // 拉后液位 油车   罐2
        'Remark': '',
        'Notes': '',
        'Notes2': '',
        'Comments': '',
        'RejectType': 0, // 驳回类型 到井站1、炼油版 2   all 3 RejectType =
        'Status': '',
        'CarApplyId': ''
      },
      TruckOillist: [],
      TruckWaterlist: [],
      DriversWaterlist: [],
      DriversOillist: [],
      ShipplaceWaterlist: [],
      ShipplaceOillist: [],
      shiptabTypevalue: '0',
      shiptablist: [],
      shipplacevalue: '',
      tranStationvalue: '',
      searchWaterType: '',
      pagination: {
        totalNum: 0,
        currentPage: 1,
        pagesizes: [5, 8, 10, 20],
        pagesize: 10
      },
      spanSort: 1,
      wellSort: 0,
      pagination2: {
        totalNum: 0,
        currentPage: 1,
        pagesizes: [5, 8, 10, 20],
        pagesize: 10
      },
      carInputRight: '0',
      noShowRightinclud91: '' // 完成列表是特殊权限  判断可否编辑
    }
  },
  mounted() { // el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子
    this.$commonFunc.myConsole('mounted ======> members')
    document.title = this.title.firstTitle
    this.init()
  },
  watch: {

  },
  methods: {
    handleSuccess(response, file, fileList) {
      commonFunc.myConsole(file)
      this.imageUrl = URL.createObjectURL(file.raw)
      this.shiptabForm.ImgPath = file.response.url
      // this.getImagePathinform(fileList)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/psd' || file.type === 'image/jpg' || file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 10
      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG/PNG/PSD/JPEG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 10MB!')
      }
      return isJPG && isLt2M
    },
    handleRemove(file, fileList) {
      commonFunc.myConsole(fileList)
      // this.getImagePathinform(fileList)
    },
    handleError(err, file, fileList) {
      commonFunc.myConsole(err)
    },
    handleExceed(file, fileList) {
      // commonFunc.myConsole(file)
      this.$message.warning('最多选择1张照片')
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
        // commonFunc.myConsole(this.identity.Identity)
      } else {
        this.currentMenuLeadListsData = JSON.parse(localStorage.getItem('currentMenuLeadListsData'))
        this.title.firstTitle = this.currentMenuLeadListsData[this.currentMenuLeadListsData.length - 1].name
        this.identity.Identity = this.currentMenuLeadListsData[this.currentMenuLeadListsData.length - 1].code
        document.title = this.title.firstTitle
      }
      this.$store.dispatch('menuLeadLists/setMenuLeadListsData', this.currentMenuLeadListsData)
      this.noShowRightinclud91 = localStorage.getItem('NoShowRightinclud91')
      this.carInputRight = localStorage.getItem('CarInputRight')
      if (this.carInputRight === '2') {
        this.activeName = '2'
      }
      // commonFunc.myConsole(0)
      // commonFunc.myConsole(this.carInputRight)
      if (this.shiptabForm.carType.CarType === '1') {
        this.getTranStationOillist()
        this.getshipOilplaces()
      } else {
        this.getTranStationWaterlist()
        this.getshipWaterplaces()
      }
      if (!(this.carInputRight === '1' || this.carInputRight === '0')) {
        this.shiptabForm.carType.CarType = '2'
      }
      this.getTags_dep()
      this.getDepartment_wkcenter()
      this.shipList_well()
      // ........................
      this.getWaterdrivers()
      this.getOildrivers()
      // ........................
      this.getOiltrucks()
      this.getWatertrucks()
      // ........................
      this.getsigners()
      // ........................
      this.assemblelinks()
      this.identitydisabled()
    },
    datepickerValuechange() {
      if (!commonFunc.isDefine(this.datepickervalue)) {
        this.datepickervalue = [0, 0]
      }
      // this.shipList_well()
    },
    allshiptabs() {
      this.tranStationvalue = ''
      this.shipplacevalue = ''
      this.shipList_well()
    },
    Sort1click(spanSort) {
      // if (spanSort === 0) {
      this.spanSort = 1
      this.wellSort = 1
      // } else if (spanSort === 1) {
      //   this.spanSort = 0
      //   this.wellSort = 0
      // }
      if (this.shiptabForm.carType.CarType === '1') {
        this.pagination.currentPage = 1
      } else {
        this.pagination2.currentPage = 1
      }
      this.shipList_well()
    },
    Sort2click(spanSort) {
      // if (spanSort === 0) {
      this.spanSort = 2
      this.wellSort = 2
      // }
      // else if (spanSort === 2) {
      //   this.spanSort = 1
      //   this.wellSort = 1
      // }

      if (this.shiptabForm.carType.CarType === '1') {
        this.pagination.currentPage = 1
      } else {
        this.pagination2.currentPage = 1
      }
      this.shipList_well()
    },
    async shipList_well() {
      this.assemblelinks() // 根据查询条件  跟新 导出链接
      let conditionsParams = {
        'Sort': this.wellSort,
        'TagId': this.search.TagId,
        'DepartmentId': this.search.Tag_DepartmentId,
        'DepartmentLev': this.search.DepartmentLev,
        'CarType': this.shiptabForm.carType.CarType, // 类型（1油车2水车，必填）
        'WaterType': '', // 水类型（对水车有效）
        'StartTime': this.datepickervalue[0] || '', // 开始日期
        'EndTime': this.datepickervalue[1] || '', // 结束日期
        'PageNo': '',
        'PageSize': ''
      }
      if (this.shiptabForm.carType.CarType === '1') {
        conditionsParams.PageNo = this.pagination.currentPage
        conditionsParams.PageSize = this.pagination.pagesize
      }
      if (this.shiptabForm.carType.CarType === '2') {
        conditionsParams.PageNo = this.pagination2.currentPage
        conditionsParams.PageSize = this.pagination2.pagesize
      }
      commonFunc.myConsole(conditionsParams)
      let resData = ''
      if (this.identity.Identity === '81') {
        resData = await shiptabApi.shipListwell(conditionsParams)
      } else if (this.identity.Identity === '82') {
        resData = await shiptabApi.shipListcheck(conditionsParams)
      } else if (this.identity.Identity === '83') {
        resData = await shiptabApi.shipListreview(conditionsParams)
      } if (this.identity.Identity === '84') {
        resData = await shiptabApi.shipListfinish(conditionsParams)
      }
      commonFunc.myConsole(resData)
      if (resData.status === '000') {
        this.shiptablist = resData.data.record
        if (this.shiptabForm.carType.CarType === '1') {
          this.pagination.totalNum = resData.data.totalNum
        }
        if (this.shiptabForm.carType.CarType === '2') {
          this.pagination2.totalNum = resData.data.totalNum
        }
      } else {
        this.$message.error('获取失败！')
      }
    },
    async shiptabget() {
      if (!commonFunc.isDefine(this.tranStationvalue)) {
        return
      }
      if (!commonFunc.isDefine(this.shipplacevalue)) {
        return
      }
      let conditionsParams = {
        'DepartmentId': this.tranStationvalue,
        'ShipPlaceId': this.shipplacevalue
      }
      let resData = await shiptabApi.shiptab_get(conditionsParams)
      if (resData.status === '000') {
        this.shiptablist = resData.data.record
      } else {
        this.$message.error('获取失败！')
      }
    },
    deleteRow(index, resMembersDataArr) {
      this.$confirm('是否确认删除该车次记录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.shiptabdel(index, resMembersDataArr)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    async shiptabdel(index, resMembersDataArr) {
      let conditionsParams = {
        'ArrayID': [resMembersDataArr[index].ID]
      }
      commonFunc.myConsole(conditionsParams)
      let resData = await shiptabApi.shiplistdel(conditionsParams)
      if (resData.status === '000') {
        this.shiptablist.splice(index, 1)
        // this.getshiptabs()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      } else {
        this.$message({
          type: 'error',
          message: '删除失败!'
        })
        // this.$message.error('用户名或密码错误')
      }
    },
    viewdetails(Status, index, resMembersDataArr) {
      if (Status === 3 && this.identity.Identity === '83') { // 办公室  审核  点击驳回项 查看时
        this.Isdetailsview = '2'
      } else { // 普通 查看时
        this.Isdetailsview = '1'
      }
      this.identity.TranStation_disabled = true
      this.identity.Oilinspd_disabled = true
      this.updateRow(index, resMembersDataArr)
    },
    viewdetailsclose() {
      this.Isdetailsview = '0'
      this.identitydisabled()
    },
    rejectviewdetailsclose() {
      this.identitydisabled()
    },
    reject(index, resMembersDataArr) { // 列表驳回按钮
      if (this.shiptabForm.carType.CarType === '2') {
        this.checkList = ['1']
      }
      this.rejectFormDialogVisible = true
    },
    async hiscirculate(index, resMembersDataArr) { // 列表历史流转 ShipRecord_list
      let conditionsParams = {
        'ShipId': resMembersDataArr[index].ID
      }
      let resData = await shiptabApi.ShipRecordlist(conditionsParams)
      if (resData.status === '000') {
        this.hiscirculatelist = resData.data.record
      } else {
        this.$message.error('获取失败！')
      }
      this.hiscirculateTableDialogVisible = true
    },
    async Recorddetail(index, resMembersDataArr) { // 列表历史流转 ShipRecord_list
      let conditionsParams = {
        'ID': resMembersDataArr[index].ID
      }
      let resData = await shiptabApi.ShipRecorddetail(conditionsParams)
      if (resData.status === '000') {
        let arr = []
        arr[0] = resData.data.record
        this.showdetail(0, arr)
      } else {
        this.$message.error('获取失败！')
      }
    },
    showdetail(index, resMembersDataArr) {
      if (this.shiptabForm.carType.CarType === '1') {
        this.getTranStationOillist()
        this.getshipOilplaces()
      } else {
        this.getTranStationWaterlist()
        this.getshipWaterplaces()
      }
      this.recorddetailDialogVisible = true
      this.shiptabForm = {
        ID: resMembersDataArr[index].ID,
        datetime: {
          'pickeroptions': { // !!!!!!!!!!!!!!
            selectableRange: '00:00:01 - 23:59:59'
          },
          'Date': resMembersDataArr[index].Date,
          'LeaveDate': resMembersDataArr[index].LeaveDate,
          'ArrivalTime': resMembersDataArr[index].Date.substr(0, 10) + ' ' + resMembersDataArr[index].ArrivalTime,
          'LeaveTime': resMembersDataArr[index].LeaveDate.substr(0, 10) + ' ' + resMembersDataArr[index].LeaveTime,
          'TargetTime': resMembersDataArr[index].TargetDate.substr(0, 10) + ' ' + resMembersDataArr[index].TargetTime,
          'TargetDate': resMembersDataArr[index].TargetDate,
          'shipMinuteStr': this.timerDiffstr(resMembersDataArr[index].ShipMinute), // !!!!!!!!!!!!!!
          'ShipMinute': resMembersDataArr[index].ShipMinute
        },
        tranStation: {
          'tranStationlist': this.shiptabForm.tranStation.tranStationlist, // !!!!!!!!!!!!!!
          'DepartmentId': resMembersDataArr[index].DepartmentId,
          'DepartmentLev': resMembersDataArr[index].DepartmentLev,
          'DepartmentName': resMembersDataArr[index].DepartmentName
        },
        shipplace: {
          'shipplacelist': this.shiptabForm.shipplace.shipplacelist, // !!!!!!!!!!!!!!
          'ShipPlaceId': resMembersDataArr[index].ShipPlaceId,
          'PlaceName': this.changeIsToCheck(resMembersDataArr[index].ShipPlaceId) ? resMembersDataArr[index].PlaceName : resMembersDataArr[index].PlaceName
        },
        driver: {
          'driverlist': this.shiptabForm.driver.driverlist, // !!!!!!!!!!!!!!
          'DriverId': resMembersDataArr[index].DriverId,
          'DriverName': resMembersDataArr[index].DriverName
        },
        truck: {
          'trucklist': this.shiptabForm.truck.trucklist, // !!!!!!!!!!!!!!
          'truckId': '',
          'CarNo': resMembersDataArr[index].CarNo
        },
        carType: {
          'CarType': resMembersDataArr[index].CarType + ''
        },
        waterType: {
          'WaterType': resMembersDataArr[index].WaterType + ''
        },
        signer: {
          'signerlist': this.shiptabForm.signer.signerlist, // !!!!!!!!!!!!!!
          'SignerId': resMembersDataArr[index].SignerId,
          'SignerName': resMembersDataArr[index].SignerName
        },
        recorder: { // 和 singer 相同   同用signerlist
          'RecorderId': resMembersDataArr[index].RecorderId,
          'RecorderName': resMembersDataArr[index].RecorderName
        },
        'OrderNo': resMembersDataArr[index].OrderNo, // 运单号
        'ImgPath': resMembersDataArr[index].ImgPath, // 图片
        'sealNum': 0, // this.getSealNoMax(resMembersDataArr[index].CarNo), // 铅封最大个数 @!!@!@!@!@!@
        'SealNo': resMembersDataArr[index].SealNo, // 铅封号以/隔开
        'HeightFront': resMembersDataArr[index].HeightFront === 0 ? '' : resMembersDataArr[index].HeightFront, // 核定空高-前(油车)/拉前液位1（水车）
        'HeightBack': resMembersDataArr[index].HeightBack === 0 ? '' : resMembersDataArr[index].HeightBack, // 核定空高-后(油车)/拉前液位2（水车）
        'Weight': resMembersDataArr[index].Weight, // 核定重量（油车）/拉前水罐液量（水车）
        'WeightTwo': resMembersDataArr[index].WeightTwo === 0 ? '' : resMembersDataArr[index].WeightTwo, // 核定重量（油车）/拉前水罐液量（水车）
        'WellHeightFront': resMembersDataArr[index].WellHeightFront === 0 ? '' : resMembersDataArr[index].WellHeightFront, // 井站实测空高-前
        'WellheightBack': resMembersDataArr[index].WellheightBack === 0 ? '' : resMembersDataArr[index].WellheightBack, // 井站实测空高-后
        'RealHeightFront': resMembersDataArr[index].RealHeightFront === 0 ? '' : resMembersDataArr[index].RealHeightFront, // 验油班实测空高-前(油车)/拉后液位1（水车）
        'RealHeightBack': resMembersDataArr[index].RealHeightBack === 0 ? '' : resMembersDataArr[index].RealHeightBack, // 验油班实测空高-后(油车)/拉后液位2（水车）
        'RealWeight': resMembersDataArr[index].RealWeight === 0 ? '' : resMembersDataArr[index].RealWeight, // 实收重量(油车)/拉后水罐液量（水车）
        'RealWeightTwo': resMembersDataArr[index].RealWeightTwo === 0 ? '' : resMembersDataArr[index].RealWeightTwo, // 实收重量(油车)/拉后水罐液量（水车）
        'DiffWeight': resMembersDataArr[index].DiffWeight, // 运差（油车RealWeight - Weight）
        'Density': resMembersDataArr[index].Density, // 油密度
        'WaterNumOne': resMembersDataArr[index].WaterNumOne, // 水罐水量1（水车）
        'WaterNumTwo': resMembersDataArr[index].WaterNumTwo, // 水罐水量2（水车）
        'WaterAdd': resMembersDataArr[index].WaterAdd, // 单车含水（油车）/补水量（水车）
        'TotalWater': resMembersDataArr[index].TotalWater, // 签单量（=水罐水量+补水量）
        'IsNormal': resMembersDataArr[index].IsNormal + '', // 呼吸阀是否正常（0否1是，油车）
        'Invalid1': resMembersDataArr[index].Invalid1 + '', // 液位计是否故障（0正常 1故障，油车）
        'Invalid2': resMembersDataArr[index].Invalid2 + '', // 液位计是否故障（0正常 1故障，油车）
        'OilLevBefore1': resMembersDataArr[index].OilLevBefore1, // 拉前液位 油车   罐1
        'OilLevAfter1': resMembersDataArr[index].OilLevAfter1, // 拉后液位 油车   罐1
        'OilLevBefore2': resMembersDataArr[index].OilLevBefore2, // 拉前液位 油车   罐2
        'OilLevAfter2': resMembersDataArr[index].OilLevAfter2, // 拉后液位 油车   罐2
        'Remark': resMembersDataArr[index].Remark,
        'Notes': resMembersDataArr[index].Notes, // 井站备注  （井站填写）
        'Notes2': resMembersDataArr[index].Notes2, // 验油班备注  （验油班填写）
        'Comments': resMembersDataArr[index].Comments, // 驳回意见
        'RejectType': resMembersDataArr[index].RejectType,
        'Status': resMembersDataArr[index].Status + '',
        'CarApplyId': resMembersDataArr[index].CarApplyId + ''
      }
    },
    rejectSubmit(Status) { // 驳回 /弹框提交按钮
      commonFunc.myConsole(this.checkList)
      if (this.checkList.length === 0) {
        this.$message.warning('请选择驳回地')
        return
      }
      this.$confirm('是否确认操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.rejectFormDialogVisible = false
        if (this.checkList.length === 1 && this.checkList[0] === '1') {
          this.shiptabForm.RejectType = 1
        } else if (this.checkList.length === 1 && this.checkList[0] === '2') {
          this.shiptabForm.RejectType = 2
        } else if (this.checkList.length === 2) {
          this.shiptabForm.RejectType = 3
        }
        commonFunc.myConsole(this.shiptabForm.RejectType)
        this.shipinfosub(Status)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    addruck(index) {
      // this.activeName = index
      this.shiptabForm.carType.CarType = index
      if (this.shiptabForm.carType.CarType === '1') {
        this.shiptabForm.truck.trucklist = this.TruckOillist
        this.shiptabForm.driver.driverlist = this.DriversOillist
        this.shiptabForm.shipplace.shipplacelist = this.ShipplaceOillist
        // this.getshipOilplaces()
      } else {
        this.shiptabForm.truck.trucklist = this.TruckWaterlist
        this.shiptabForm.driver.driverlist = this.DriversWaterlist
        // this.shiptabForm.shipplace.shipplacelist = this.ShipplaceWaterlist
        this.getshipWaterplaces()
      }
      this.assemblelinks()
      this.identitydisabled()
      // this.shipList_well()
      this.updateRow('', [])
    },
    updateRow(index, resMembersDataArr) {
      if (this.shiptabForm.carType.CarType === '1') {
        this.getTranStationOillist()
        this.getshipOilplaces()
      } else {
        this.getTranStationWaterlist()
        this.getshipWaterplaces()
      }
      this.imageUrl = ''
      this.IsToCheck = '1'
      this.shiptabFormDialogVisible = true
      if (index === '') {
        this.dynamicTags = []
        this.inputVisible = false
        this.inputValue = ''
        this.IsToCheck = '1'
        this.shiptabForm = {
          ID: '',
          datetime: {
            'pickeroptions': { // !!!!!!!!!!!!!!
              selectableRange: '00:00:01 - 23:59:59'
            },
            'Date': new Date(),
            'LeaveDate': new Date(),
            'ArrivalTime': '',
            'LeaveTime': '',
            'TargetTime': '',
            'TargetDate': new Date(),
            'shipMinuteStr': '', // !!!!!!!!!!!!!!
            'ShipMinute': ''
          },
          tranStation: {
            'tranStationlist': this.shiptabForm.tranStation.tranStationlist, // !!!!!!!!!!!!!!
            'DepartmentId': '',
            'DepartmentLev': '',
            'DepartmentName': ''
          },
          shipplace: {
            'shipplacelist': this.shiptabForm.shipplace.shipplacelist, // !!!!!!!!!!!!!!
            'ShipPlaceId': '',
            'PlaceName': ''
          },
          driver: {
            'driverlist': this.shiptabForm.driver.driverlist, // !!!!!!!!!!!!!!
            'DriverId': '',
            'DriverName': ''
          },
          truck: {
            'trucklist': this.shiptabForm.truck.trucklist, // !!!!!!!!!!!!!!
            'truckId': '',
            'CarNo': ''
          },
          carType: {
            'CarType': this.shiptabForm.carType.CarType
          },
          waterType: {
            'WaterType': ''
          },
          signer: {
            'signerlist': this.shiptabForm.signer.signerlist, // !!!!!!!!!!!!!!
            'SignerId': '',
            'SignerName': ''
          },
          recorder: {
            'RecorderId': '',
            'RecorderName': ''
          },
          'OrderNo': '', // 运单号
          'ImgPath': '', // 图片
          'sealNum': '', // 铅封最大个数
          'SealNo': '', // 铅封号以/隔开
          'HeightFront': '', // 核定空高-前(油车)/拉前液位1（水车）
          'HeightBack': '', // 核定空高-后(油车)/拉前液位2（水车）
          'Weight': '', // 核定重量（油车）/拉前水罐液量（水车）
          'WeightTwo': '', // 核定重量（油车）/拉前水罐液量（水车）
          'WellHeightFront': '', // 井站实测空高-前
          'WellheightBack': '', // 井站实测空高-后
          'RealHeightFront': '', // 验油班实测空高-前(油车)/拉后液位1（水车）
          'RealHeightBack': '', // 验油班实测空高-后(油车)/拉后液位2（水车）
          'RealWeight': '', // 实收重量(油车)/拉后水罐液量（水车）
          'RealWeightTwo': '', // 实收重量(油车)/拉后水罐液量（水车）
          'DiffWeight': '', // 运差（油车RealWeight - Weight）
          'Density': '', // 油密度
          'WaterNumOne': '', // 水罐水量1（水车）
          'WaterNumTwo': '', // 水罐水量2（水车）
          'WaterAdd': '', // 单车含水（油车）/补水量（水车）
          'TotalWater': '', // 签单量（=水罐水量+补水量）
          'IsNormal': '0', // 呼吸阀是否正常（0否1是，油车）
          'Invalid1': '0', // 液位计是否故障（0正常 1故障，油车）
          'Invalid2': '0', // 液位计是否故障（0正常 1故障，油车）
          'OilLevBefore1': '', // 拉前液位 油车   罐1
          'OilLevAfter1': '', // 拉后液位 油车   罐1
          'OilLevBefore2': '', // 拉前液位 油车   罐2
          'OilLevAfter2': '', // 拉后液位 油车   罐2
          'Remark': '',
          'Notes': '', // 井站备注  （井站填写）
          'Notes2': '', // 验油班备注  （验油班填写）
          'Comments': '', // 驳回意见
          'RejectType': 0,
          'Status': '',
          'CarApplyId': ''
        }
      } else {
        commonFunc.myConsole(resMembersDataArr[index])
        this.dynamicTags = resMembersDataArr[index].SealNo ? resMembersDataArr[index].SealNo.split('/') : []
        this.inputVisible = false
        this.inputValue = ''
        this.imageUrl = resMembersDataArr[index].ImgPath ? this.imageip + resMembersDataArr[index].ImgPath : ''
        // this.IsToCheck = resMembersDataArr[index].IsToCheck + ''
        this.shiptabForm = {
          ID: resMembersDataArr[index].ID,
          datetime: {
            'pickeroptions': { // !!!!!!!!!!!!!!
              selectableRange: '00:00:01 - 23:59:59'
            },
            'Date': resMembersDataArr[index].Date,
            'LeaveDate': resMembersDataArr[index].LeaveDate,
            'ArrivalTime': resMembersDataArr[index].ArrivalTime ? (resMembersDataArr[index].Date.substr(0, 10) + ' ' + resMembersDataArr[index].ArrivalTime) : '',
            'LeaveTime': resMembersDataArr[index].LeaveTime ? ((resMembersDataArr[index].LeaveDate ? resMembersDataArr[index].LeaveDate.substr(0, 10) : resMembersDataArr[index].Date.substr(0, 10)) + ' ' + resMembersDataArr[index].LeaveTime) : '',
            'TargetTime': resMembersDataArr[index].TargetTime ? (resMembersDataArr[index].TargetDate.substr(0, 10) + ' ' + resMembersDataArr[index].TargetTime) : '',
            'TargetDate': resMembersDataArr[index].TargetDate,
            'shipMinuteStr': this.timerDiffstr(resMembersDataArr[index].ShipMinute), // !!!!!!!!!!!!!!
            'ShipMinute': resMembersDataArr[index].ShipMinute
          },
          tranStation: {
            'tranStationlist': this.shiptabForm.tranStation.tranStationlist, // !!!!!!!!!!!!!!
            'DepartmentId': resMembersDataArr[index].DepartmentId ? resMembersDataArr[index].DepartmentId : '',
            'DepartmentLev': resMembersDataArr[index].DepartmentLev,
            'DepartmentName': resMembersDataArr[index].DepartmentName
          },
          shipplace: {
            'shipplacelist': this.shiptabForm.shipplace.shipplacelist, // !!!!!!!!!!!!!!
            'ShipPlaceId': resMembersDataArr[index].ShipPlaceId ? resMembersDataArr[index].ShipPlaceId : '',
            'PlaceName': this.changeIsToCheck(resMembersDataArr[index].ShipPlaceId) ? resMembersDataArr[index].PlaceName : resMembersDataArr[index].PlaceName
          },
          driver: {
            'driverlist': this.shiptabForm.driver.driverlist, // !!!!!!!!!!!!!!
            'DriverId': resMembersDataArr[index].DriverId ? resMembersDataArr[index].DriverId : '',
            'DriverName': resMembersDataArr[index].DriverName
          },
          truck: {
            'trucklist': this.shiptabForm.truck.trucklist, // !!!!!!!!!!!!!!
            'truckId': '',
            'CarNo': resMembersDataArr[index].CarNo
          },
          carType: {
            'CarType': resMembersDataArr[index].CarType + ''
          },
          waterType: {
            'WaterType': resMembersDataArr[index].WaterType ? resMembersDataArr[index].WaterType + '' : ''
          },
          signer: {
            'signerlist': this.shiptabForm.signer.signerlist, // !!!!!!!!!!!!!!
            'SignerId': resMembersDataArr[index].SignerId ? resMembersDataArr[index].SignerId : '',
            'SignerName': resMembersDataArr[index].SignerName
          },
          recorder: { // 和 singer 相同   同用signerlist
            'RecorderId': resMembersDataArr[index].RecorderId ? resMembersDataArr[index].RecorderId : '',
            'RecorderName': resMembersDataArr[index].RecorderName
          },
          'OrderNo': resMembersDataArr[index].OrderNo === '0' ? '' : resMembersDataArr[index].OrderNo, // 运单号
          'ImgPath': resMembersDataArr[index].ImgPath, // 图片
          'sealNum': 0, // this.getSealNoMax(resMembersDataArr[index].CarNo), // 铅封最大个数 @!!@!@!@!@!@
          'SealNo': resMembersDataArr[index].SealNo, // 铅封号以/隔开
          'HeightFront': resMembersDataArr[index].HeightFront === 0 ? '' : resMembersDataArr[index].HeightFront, // 核定空高-前(油车)/拉前液位1（水车）
          'HeightBack': resMembersDataArr[index].HeightBack === 0 ? '' : resMembersDataArr[index].HeightBack, // 核定空高-后(油车)/拉前液位2（水车）
          'Weight': resMembersDataArr[index].Weight, // 核定重量（油车）/拉前水罐液量（水车）
          'WeightTwo': resMembersDataArr[index].WeightTwo === 0 ? '' : resMembersDataArr[index].WeightTwo, // 核定重量（油车）/拉前水罐液量（水车）
          'WellHeightFront': resMembersDataArr[index].WellHeightFront === 0 ? '' : resMembersDataArr[index].WellHeightFront, // 井站实测空高-前
          'WellheightBack': resMembersDataArr[index].WellheightBack === 0 ? '' : resMembersDataArr[index].WellheightBack, // 井站实测空高-后
          'RealHeightFront': resMembersDataArr[index].RealHeightFront === 0 ? '' : resMembersDataArr[index].RealHeightFront, // 验油班实测空高-前(油车)/拉后液位1（水车）
          'RealHeightBack': resMembersDataArr[index].RealHeightBack === 0 ? '' : resMembersDataArr[index].RealHeightBack, // 验油班实测空高-后(油车)/拉后液位2（水车）
          'RealWeight': resMembersDataArr[index].RealWeight === 0 ? '' : resMembersDataArr[index].RealWeight, // 实收重量(油车)/拉后水罐液量（水车）
          'RealWeightTwo': resMembersDataArr[index].RealWeightTwo === 0 ? '' : resMembersDataArr[index].RealWeightTwo, // 实收重量(油车)/拉后水罐液量（水车）
          'DiffWeight': resMembersDataArr[index].DiffWeight, // 运差（油车RealWeight - Weight）
          'Density': resMembersDataArr[index].Density, // 油密度
          'WaterNumOne': resMembersDataArr[index].WaterNumOne, // 水罐水量1（水车）
          'WaterNumTwo': resMembersDataArr[index].WaterNumTwo, // 水罐水量2（水车）
          'WaterAdd': resMembersDataArr[index].WaterAdd, // 单车含水（油车）/补水量（水车）
          'TotalWater': resMembersDataArr[index].TotalWater, // 签单量（=水罐水量+补水量）
          'IsNormal': resMembersDataArr[index].IsNormal + '', // 呼吸阀是否正常（0否1是，油车）
          'Invalid1': resMembersDataArr[index].Invalid1 + '', // 液位计是否故障（0正常 1故障，油车）
          'Invalid2': resMembersDataArr[index].Invalid2 + '', // 液位计是否故障（0正常 1故障，油车）
          'OilLevBefore1': resMembersDataArr[index].OilLevBefore1, // 拉前液位 油车   罐1
          'OilLevAfter1': resMembersDataArr[index].OilLevAfter1, // 拉后液位 油车   罐1
          'OilLevBefore2': resMembersDataArr[index].OilLevBefore2, // 拉前液位 油车   罐2
          'OilLevAfter2': resMembersDataArr[index].OilLevAfter2, // 拉后液位 油车   罐2
          'Remark': resMembersDataArr[index].Remark,
          'Notes': resMembersDataArr[index].Notes, // 井站备注  （井站填写）
          'Notes2': resMembersDataArr[index].Notes2, // 验油班备注  （验油班填写）
          'Comments': resMembersDataArr[index].Comments, // 驳回意见
          'RejectType': resMembersDataArr[index].RejectType,
          'Status': resMembersDataArr[index].Status + '',
          'CarApplyId': resMembersDataArr[index].CarApplyId
        }
      }
    },
    editinfo(Status) {
      // if ((this.identity.Identity === '81' && Status !== 0) || (this.identity.Identity === '82' && Status !== 1) || (this.identity.Identity === '83' && Status !== 2)) {
      if (this.identity.Identity !== '82') {
        if (!this.shiptabForm.tranStation.DepartmentId) {
          this.$message.warning('请选择井站')
          return
        }
        if (!this.shiptabForm.shipplace.ShipPlaceId) {
          this.$message.warning('请选择卸载地')
          return
        }
      }
      if ((this.identity.Identity !== '82') && (Status !== 0)) {
        if (this.shiptabForm.carType.CarType === '2') {
          if (!this.shiptabForm.waterType.WaterType) {
            this.$message.warning('请选择运水类型')
            return
          }
        }
        if (this.shiptabForm.carType.CarType === '1' || (this.shiptabForm.carType.CarType === '2' && this.shiptabForm.waterType.WaterType === '3')) {
          if (!this.shiptabForm.datetime.Date) {
            this.$message.warning('请选择进站日期')
            return
          }
          if (!this.shiptabForm.datetime.LeaveDate) {
            this.$message.warning('请选择出站日期')
            return
          }
          if (!this.shiptabForm.datetime.ArrivalTime) {
            this.$message.warning('请选择进井站时间')
            return
          }
          if (!this.shiptabForm.datetime.LeaveTime) {
            this.$message.warning('请选择出井站时间')
            return
          }
        }
        if (!this.shiptabForm.OrderNo) {
          this.$message.warning('请输入运单号')
          return
        }
        if (!this.shiptabForm.truck.CarNo) {
          this.$message.warning('请选择车牌号')
          return
        }
        if (!this.shiptabForm.driver.DriverId) {
          this.$message.warning('请选择驾驶员')
          return
        }
        // if (!this.shiptabForm.ImgPath) {
        //   this.$message.warning('请上传图片')
        //   return
        // }
        if (this.shiptabForm.carType.CarType === '1') {
          // if (!this.shiptabForm.SealNo) {
          //   this.$message.warning('请输入铅封号')
          //   return
          // }
          if (this.shiptabForm.Invalid1 === '0' && !this.shiptabForm.OilLevBefore1) {
            this.$message.warning('请输入油罐1拉前液位')
            return
          }
          if (this.shiptabForm.Invalid1 === '0' && !this.shiptabForm.OilLevAfter1) {
            this.$message.warning('请输入油罐1拉后液位')
            return
          }
          if (this.shiptabForm.Invalid2 === '0' && !this.shiptabForm.OilLevBefore2) {
            this.$message.warning('请输入油罐2拉前液位')
            return
          }
          if (this.shiptabForm.Invalid2 === '0' && !this.shiptabForm.OilLevAfter2) {
            this.$message.warning('请输入油罐2拉后液位')
            return
          }
          // shiptabForm.HeightBack
          if (!this.shiptabForm.HeightBack) {
            if (!this.shiptabForm.WellHeightFront) {
              this.$message.warning('请输入井站实测空高')
              return
            }
          } else if (!this.shiptabForm.WellHeightFront || !this.shiptabForm.WellheightBack) {
            this.$message.warning('请输入井站实测空高')
            return
          }
          if (!this.shiptabForm.recorder.RecorderName) {
            this.$message.warning('请填写记录人')
            return
          }
          if (!this.shiptabForm.signer.SignerName) {
            this.$message.warning('请填写签认人')
            return
          }
        }
      }
      if (this.identity.Identity !== '81' && Status !== 1) {
        if (this.shiptabForm.carType.CarType === '1') {
          if (!this.shiptabForm.HeightBack) {
            if (!this.shiptabForm.RealHeightFront) {
              this.$message.warning('请输入验油班实测空高')
              return
            }
          } else if (!this.shiptabForm.RealHeightFront || !this.shiptabForm.RealHeightBack) {
            this.$message.warning('请输入验油班实测空高')
            return
          }
          if (!this.shiptabForm.RealWeight) {
            this.$message.warning('请输入实收重量')
            return
          }
          if (!this.shiptabForm.Density) {
            this.$message.warning('请输入油密度')
            return
          }
          if (!this.shiptabForm.WaterAdd && this.shiptabForm.WaterAdd !== 0) {
            this.$message.warning('请输入单车含水量')
            return
          }
          if (!this.shiptabForm.IsNormal) {
            this.$message.warning('请检查呼吸阀是否正常')
            return
          }
        }
      }
      if (this.shiptabForm.carType.CarType === '2' && Status !== 0) {
        if (this.shiptabForm.waterType.WaterType === '3') {
          if (!this.shiptabForm.HeightFront && this.shiptabForm.Invalid1 === '0') {
            this.$message.warning('请输入拉前水罐液位')
            return
          }
          if (!this.shiptabForm.Weight && this.shiptabForm.Invalid1 === '0') {
            this.$message.warning('请输入拉前水罐液量')
            return
          }
          if (!this.shiptabForm.RealHeightFront && this.shiptabForm.Invalid1 === '0') {
            this.$message.warning('请输入拉后水罐液位')
            return
          }
          if (!this.shiptabForm.RealWeight && this.shiptabForm.Invalid1 === '0') {
            this.$message.warning('请输入拉后水罐液量')
            return
          }
          if (this.shiptabForm.HeightBack && this.shiptabForm.Invalid2 === '0') { // HeightBack 水罐二液位   有值
            if (!this.shiptabForm.WeightTwo) {
              this.$message.warning('请输入拉前水罐2液量')
              return
            }
            if (!this.shiptabForm.RealHeightBack) {
              this.$message.warning('请输入拉后水罐2液位')
              return
            }
            if (!this.shiptabForm.RealWeightTwo) {
              this.$message.warning('请输入拉后水罐2液量')
              return
            }
          }
          // if (!this.shiptabForm.HeightBack) {
          //   if (!this.shiptabForm.Weight) {
          //     this.$message.warning('请输入拉前水罐液量')
          //     return
          //   }
          // } else
          // if (this.shiptabForm.Invalid1 === '0' && this.shiptabForm.HeightBack !== '0' && (!this.shiptabForm.Weight || !this.shiptabForm.WeightTwo)) {
          //   this.$message.warning('请输入拉前水罐液量')
          //   return
          // }
          // if (!this.shiptabForm.HeightBack) {
          //   if (!this.shiptabForm.RealHeightFront && this.shiptabForm.Invalid1 === '0') {
          //     this.$message.warning('请输入拉后液位')
          //     return
          //   }
          // } else if (this.shiptabForm.Invalid1 === '0' && this.shiptabForm.HeightBack !== '0' && (!this.shiptabForm.RealHeightFront || !this.shiptabForm.RealHeightBack)) {
          //   this.$message.warning('请输入拉后液位')
          //   return
          // }
          // if (!this.shiptabForm.HeightBack) {
          //   if (!this.shiptabForm.RealWeight) {
          //     this.$message.warning('请输入拉后水罐液量')
          //     return
          //   }
          // } else if (this.shiptabForm.HeightBack !== '0' && (!this.shiptabForm.RealWeight || !this.shiptabForm.RealWeightTwo)) {
          //   this.$message.warning('请输入拉后水罐液量')
          //   return
          // }
        }
        if (this.shiptabForm.Invalid1 === '1' && this.shiptabForm.WaterNumOne === '') {
          this.$message.warning('请输入水罐1水量')
          return
        }
        if (!this.shiptabForm.WaterAdd && this.shiptabForm.WaterAdd !== 0) {
          this.$message.warning('请输入补水量')
          return
        }
        if (!this.shiptabForm.signer.SignerName) {
          this.$message.warning('请填写签认人')
          return
        }
        if (!this.shiptabForm.recorder.RecorderName) {
          this.$message.warning('请填写记录人')
          return
        }
      }
      if (this.identity.Identity !== '81' && Status !== 1) {
        if (!this.shiptabForm.datetime.TargetDate) {
          this.$message.warning('请选择到达卸载地日期')
          return
        }
        if (this.shiptabForm.carType.CarType === '2') {
          if (this.shiptabForm.waterType.WaterType === '3') {
            if (!this.shiptabForm.datetime.TargetTime) {
              this.$message.warning('请选择到达卸载地时间')
              return
            }
            if (!this.shiptabForm.datetime.ShipMinute) {
              this.$message.warning('请检查出井站时间与到达卸载地时间是否合理')
              return
            }
          }
        } else {
          if (!this.shiptabForm.datetime.TargetTime) {
            this.$message.warning('请选择到达卸载地时间')
            return
          }
          if (!this.shiptabForm.datetime.ShipMinute) {
            this.$message.warning('请检查出井站时间与到达卸载地时间是否合理')
            return
          }
        }
      } else if (this.shiptabForm.carType.CarType === '2' && this.IsToCheck !== '0') {
        if (Status !== 0) {
          if (!this.shiptabForm.datetime.TargetDate) {
            this.$message.warning('请选择到达卸载地日期')
            return
          }
          if (this.shiptabForm.waterType.WaterType === '3') {
            if (!this.shiptabForm.datetime.TargetTime) {
              this.$message.warning('请选择到达卸载地时间')
              return
            }
            if (!this.shiptabForm.datetime.ShipMinute) {
              this.$message.warning('请检查出井站时间与到达卸载地时间是否合理')
              return
            }
          }
        }
      }
      // }
      this.$confirm('是否确认操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.shipinfosub(Status)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    async shipinfosub(Status) {
      let conditionsParams = {
        'ID': this.shiptabForm.ID, // 为空新增 其余为修改
        'Date': commonFunc.dateFormat(this.shiptabForm.datetime.Date, 1),
        'LeaveDate': commonFunc.dateFormat(this.shiptabForm.datetime.LeaveDate, 1),
        'ArrivalTime': commonFunc.dateFormat(this.shiptabForm.datetime.ArrivalTime, 0) || '',
        'LeaveTime': commonFunc.dateFormat(this.shiptabForm.datetime.LeaveTime, 0) || '',
        'TargetTime': commonFunc.dateFormat(this.shiptabForm.datetime.TargetTime, 0) || '',
        'TargetDate': commonFunc.dateFormat(this.shiptabForm.datetime.TargetDate, 1),
        'ShipMinute': this.shiptabForm.datetime.ShipMinute || 0,
        'DepartmentId': this.shiptabForm.tranStation.DepartmentId || 0,
        'DepartmentLev': this.shiptabForm.tranStation.DepartmentLev,
        'DepartmentName': this.shiptabForm.tranStation.DepartmentName,
        'ShipPlaceId': this.shiptabForm.shipplace.ShipPlaceId || 0,
        'PlaceName': this.shiptabForm.shipplace.PlaceName,
        'DriverId': this.shiptabForm.driver.DriverId || 0,
        'DriverName': this.shiptabForm.driver.DriverName,
        'CarNo': this.shiptabForm.truck.CarNo,
        'CarType': this.shiptabForm.carType.CarType,
        'WaterType': this.shiptabForm.waterType.WaterType || 0, // 水车接口 专享字段!!!!!!!!!!!!!!
        // 'SignerId': this.shiptabForm.signer.SignerId || 0,
        'SignerName': this.shiptabForm.signer.SignerName, // 水车接口 专享字段!!!!!!!!!!!!!!
        // 'RecorderId': this.shiptabForm.recorder.RecorderId || 0,
        'RecorderName': this.shiptabForm.recorder.RecorderName, // 水车接口 专享字段!!!!!!!!!!!!!!
        'OrderNo': this.shiptabForm.OrderNo || 0, // 运单号
        'ImgPath': this.shiptabForm.ImgPath,
        'SealNo': this.shiptabForm.SealNo, // 铅封号以/隔开
        'HeightFront': this.shiptabForm.HeightFront || 0, // 核定空高-前(油车)/拉前液位1（水车）
        'HeightBack': this.shiptabForm.HeightBack || 0, // 核定空高-后(油车)/拉前液位2（水车）
        'Weight': this.shiptabForm.Weight || 0, // 核定重量（油车）/拉前水罐液量（水车）
        'WellHeightFront': this.shiptabForm.WellHeightFront || 0, // 井站实测空高-前
        'WellheightBack': this.shiptabForm.WellheightBack || 0, // 井站实测空高-后
        'RealHeightFront': this.shiptabForm.RealHeightFront || 0, // 验油班实测空高-前(油车)/拉后液位1（水车）
        'RealHeightBack': this.shiptabForm.RealHeightBack || 0, // 验油班实测空高-后(油车)/拉后液位2（水车）
        'RealWeight': this.shiptabForm.RealWeight || 0, // 实收重量(油车)/拉后水罐液量（水车）
        'WeightTwo': this.shiptabForm.WeightTwo || 0,
        'RealWeightTwo': this.shiptabForm.RealWeightTwo || 0,
        'DiffWeight': this.shiptabForm.DiffWeight || 0, // 运差（油车RealWeight - Weight）
        'Density': this.shiptabForm.Density || 0, // 油密度
        'WaterNumOne': this.shiptabForm.WaterNumOne || 0, // 水罐水量1（水车）  // 水车接口 专享字段!!!!!!!!!!!!!!
        'WaterNumTwo': this.shiptabForm.WaterNumTwo || 0, // 水罐水量2（水车）  // 水车接口 专享字段!!!!!!!!!!!!!!
        'WaterAdd': this.shiptabForm.WaterAdd || 0, // 单车含水（油车）/补水量（水车）
        'TotalWater': this.shiptabForm.TotalWater || 0, // 签单量（=水罐水量+补水量）
        'IsNormal': this.shiptabForm.IsNormal || 0, // 呼吸阀是否正常（0否1是，油车）
        'Invalid1': this.shiptabForm.Invalid1 || 0, // 液位计是否故障（0正常 1故障，油车）
        'Invalid2': this.shiptabForm.Invalid2 || 0, // 液位计是否故障（0正常 1故障，油车）
        'OilLevBefore1': this.shiptabForm.OilLevBefore1 || 0, // 拉前液位 油车   罐1
        'OilLevAfter1': this.shiptabForm.OilLevAfter1 || 0, // 拉后液位 油车   罐1
        'OilLevBefore2': this.shiptabForm.OilLevBefore2 || 0, // 拉前液位 油车   罐2
        'OilLevAfter2': this.shiptabForm.OilLevAfter2 || 0, // 拉后液位 油车   罐2
        'Remark': this.shiptabForm.Remark, // 完成备注  （自动生成）
        'Notes': this.shiptabForm.Notes, // 井站备注  （井站填写）
        'Notes2': this.shiptabForm.Notes2, // 验油班备注  （验油班填写）
        'Comments': this.shiptabForm.Comments, // 驳回意见
        'RejectType': this.shiptabForm.RejectType,
        'Status': Status,
        'CarApplyId': this.shiptabForm.CarApplyId
      }
      commonFunc.myConsole(JSON.stringify(conditionsParams))
      let resData = ''
      if (this.identity.Identity === '81') {
        resData = await shiptabApi.shiplistadd(conditionsParams)
      } else if (this.identity.Identity === '82') {
        resData = await shiptabApi.shiplistverfi(conditionsParams)
      } else if (this.identity.Identity === '83') {
        resData = await shiptabApi.shiplistaudit(conditionsParams)
      } else if (this.identity.Identity === '84') {
        resData = await shiptabApi.shiplistadjust(conditionsParams)
      }
      if (resData.status === '000') {
        this.checkList = []
        this.shiptabFormDialogVisible = false
        this.activeName = this.shiptabForm.carType.CarType // 操作成功 列表 与此提交用车  一致
        this.shipList_well()
        this.$message({
          type: 'success',
          message: '操作成功!'
        })
      } else if (resData.status === '8001') {
        this.$message.error('运单号重复，请核查！')
      } else {
        this.$message.error('网络异常！')
      }
    },
    timerDiffstr(minutesDiff) {
      let hours2 = parseInt(minutesDiff / 60)
      let day = parseInt(hours2 / 24)
      let hours1 = parseInt(hours2 % 24)
      let minutes1 = minutesDiff % 60
      let str1 = ''
      if (day === 0) {
        if (hours1 <= 0) {
          str1 = minutes1 + '分钟'
        } else {
          if (minutes1 <= 0) {
            str1 = hours1 + '小时'
          } else {
            str1 = hours1 + '小时' + minutes1 + '分钟'
          }
        }
      } else {
        if (hours1 <= 0) {
          str1 = day + '天' + '0小时' + minutes1 + '分钟'
        } else {
          if (minutes1 <= 0) {
            str1 = day + '天' + hours1 + '小时'
          } else {
            str1 = day + '天' + hours1 + '小时' + minutes1 + '分钟'
          }
        }
      }
      return str1
    },
    getSealNoMax(CarNo) {
      if (commonFunc.isDefine(CarNo)) {
        commonFunc.myConsole(CarNo)
        return
      }
      let Arr = this.shiptabForm.truck.trucklist.find(item => item.CarNo === CarNo)
      if (commonFunc.isDefine(Arr)) {
        this.shiptabForm.truck.truckId = Arr.ID
        return Arr.SealNum
      } else {
        this.shiptabForm.truck.truckId = ''
        return 0
      }
    },
    getDepartinform(value) { // DepartmentLev 等信息组装
      let arr = this.shiptabForm.tranStation.tranStationlist.filter(function(obj) {
        return obj.DepartmentId === value
      })
      if (commonFunc.isDefine(arr)) {
        this.shiptabForm.tranStation.DepartmentLev = arr[0].DepartmentLev
        this.shiptabForm.tranStation.DepartmentName = arr[0].DepartmentName
      } else {
        this.shiptabForm.tranStation.DepartmentLev = ''
        this.shiptabForm.tranStation.DepartmentName = ''
      }
    },
    getshipplaceinform(value) { // shipplace 等信息组装
      let arr = this.shiptabForm.shipplace.shipplacelist.filter(function(obj) {
        return obj.ID === value
      })
      commonFunc.myConsole(commonFunc.isDefine(arr))
      if (commonFunc.isDefine(arr) && arr.length > 0) {
        this.shiptabForm.shipplace.PlaceName = arr[0].Place
        this.IsToCheck = arr[0].IsToCheck + ''
      } else {
        this.shiptabForm.shipplace.PlaceName = ''
      }
    },
    changeIsToCheck(Id) {
      this.getshipplaceinform(Id)
      return ''
    },
    gettruckinform(value) { // truck 等信息组装
      let arr = this.shiptabForm.truck.trucklist.filter(function(obj) {
        return obj.CarNo === value
      })
      if (commonFunc.isDefine(arr)) {
        this.shiptabForm.truck.truckId = arr[0].ID
        if (this.shiptabForm.carType.CarType === '1') {
          this.shiptabForm.sealNum = arr[0].SealNum
          this.shiptabForm.HeightFront = arr[0].CalHeightFront
          this.shiptabForm.HeightBack = arr[0].CalHeightBack
          this.shiptabForm.Weight = arr[0].RealWeight
          this.calDiffWeight()
        }
      } else {
        this.shiptabForm.truck.truckId = ''
        if (this.shiptabForm.carType.CarType === '1') {
          this.shiptabForm.sealNum = 0
          this.shiptabForm.HeightFront = 0
          this.shiptabForm.HeightBack = 0
          this.shiptabForm.Weight = 0
          this.calDiffWeight()
        }
      }
    },
    getdriverinform(value) { // driver 等信息组装
      let arr = this.shiptabForm.driver.driverlist.filter(function(obj) {
        return obj.ID === value
      })
      if (commonFunc.isDefine(arr)) {
        this.shiptabForm.driver.DriverName = arr[0].DriverName
      } else {
        this.shiptabForm.driver.DriverName = ''
      }
    },
    getRecorderinform(value) { // RecorderName 等信息组装
      let arr = this.shiptabForm.signer.signerlist.filter(function(obj) {
        return obj.ID === value
      })
      if (commonFunc.isDefine(arr)) {
        this.shiptabForm.recorder.RecorderName = arr[0].NickName
      } else {
        this.shiptabForm.recorder.RecorderName = ''
      }
    },
    getSignerinform(value) { // Signer 等信息组装
      let arr = this.shiptabForm.signer.signerlist.filter(function(obj) {
        return obj.ID === value
      })
      // commonFunc.myConsole(arr)
      if (commonFunc.isDefine(arr)) {
        this.shiptabForm.signer.SignerName = arr[0].NickName
      } else {
        this.shiptabForm.signer.SignerName = ''
      }
    },
    handleClick(tab, event) {
      this.shiptabForm.carType.CarType = tab.name
      if (this.shiptabForm.carType.CarType === '1') {
        this.shiptabForm.truck.trucklist = this.TruckOillist
        this.shiptabForm.driver.driverlist = this.DriversOillist
        this.shiptabForm.shipplace.shipplacelist = this.ShipplaceOillist
        // this.getshipOilplaces()
      } else {
        this.shiptabForm.truck.trucklist = this.TruckWaterlist
        this.shiptabForm.driver.driverlist = this.DriversWaterlist
        // this.shiptabForm.shipplace.shipplacelist = this.ShipplaceWaterlist
        this.getshipWaterplaces()
      }
      this.assemblelinks()
      this.identitydisabled()
      this.shipList_well()
    },
    identitydisabled() {
      if (this.shiptabForm.carType.CarType === '2') {
        this.identity.TranStation_disabled = false
        this.identity.Oilinspd_disabled = false
      } else if (this.identity.Identity === '81') {
        this.identity.TranStation_disabled = false
        this.identity.Oilinspd_disabled = true
      } else if (this.identity.Identity === '82') {
        this.identity.TranStation_disabled = true
        this.identity.Oilinspd_disabled = false
      } else if (this.identity.Identity === '83' || this.identity.Identity === '84') {
        this.identity.TranStation_disabled = false
        this.identity.Oilinspd_disabled = false
      }
    },
    Invalid1change(value) {
      if (value === '1') {
        if (this.shiptabForm.carType.CarType === '2') {
          // this.shiptabForm.HeightFront = ''
          // this.shiptabForm.Weight = ''
          // this.shiptabForm.RealHeightFront = ''
          // this.shiptabForm.RealWeight = ''
          // this.shiptabForm.WaterNumOne = ''
        } else {
          this.shiptabForm.OilLevBefore1 = ''
          this.shiptabForm.OilLevAfter1 = ''
        }
        this.calTotalWater()
      } else {
        this.calWaterNum()
      }
    },
    Invalid2change(value) {
      if (value === '1') {
        if (this.shiptabForm.carType.CarType === '2') {
          // this.shiptabForm.HeightBack = ''
          // this.shiptabForm.WeightTwo = ''
          // this.shiptabForm.RealHeightBack = ''
          // this.shiptabForm.RealWeightTwo = ''
          // this.shiptabForm.WaterNumTwo = ''
        } else {
          this.shiptabForm.OilLevAfter2 = ''
          this.shiptabForm.OilLevBefore2 = ''
        }
        this.calTotalWater()
      } else {
        this.calWaterNum()
        // this.calTotalWater()
      }
    },
    WaterTypechange(value) {
      if (value !== '3') {
        this.shiptabForm.datetime.ArrivalTime = ''
        this.shiptabForm.datetime.LeaveTime = ''
        this.shiptabForm.datetime.TargetTime = ''
        this.shiptabForm.HeightFront = ''
        this.shiptabForm.Weight = ''
        this.shiptabForm.RealHeightFront = ''
        this.shiptabForm.RealWeight = ''
        this.shiptabForm.WaterNumOne = ''
        this.shiptabForm.HeightBack = ''
        this.shiptabForm.WeightTwo = ''
        this.shiptabForm.RealHeightBack = ''
        this.shiptabForm.RealWeightTwo = ''
        this.shiptabForm.WaterNumTwo = ''
        this.shiptabForm.TotalWater = ''
      }
    },
    setstartime() { // 设置 时刻起始点  确保 出站时刻选择  在进站时刻后
      // let d = new Date(this.shiptabForm.datetime.ArrivalTime)
      // let datetime = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
      // // if (this.shiptabForm.datetime.LeaveDate === this.shiptabForm.datetime.Date) {
      //   this.shiptabForm.datetime.pickeroptions = {
      //     selectableRange: datetime + ' - 23:59:00'
      //   }
      // // }
    },
    setstartdate() { // 设置 日期起始点  确保 出站日期选择  在进站日期后
      let d = this.shiptabForm.datetime
      this.pickerOptions2 = {
        disabledDate(time) {
          return time.getTime() < new Date(d.Date).getTime() || time.getTime() > Date.now()
        }
      }
    },
    datechange(type) {
      if (type === 'Start') {
        this.shiptabForm.datetime.LeaveDate = ''
        this.setstartdate()
      }
      let LeaveDate = new Date(this.shiptabForm.datetime.Date)
      let TargetDate = new Date(this.shiptabForm.datetime.TargetDate)
      this.shiptabForm.datetime.Date = LeaveDate.getFullYear() + '-' + (LeaveDate.getMonth() + 1) + '-' + LeaveDate.getDate()
      this.shiptabForm.datetime.TargetDate = TargetDate.getFullYear() + '-' + (TargetDate.getMonth() + 1) + '-' + TargetDate.getDate()
      if (this.shiptabForm.datetime.LeaveTime) {
        let LeaveTime = new Date(this.shiptabForm.datetime.LeaveTime)
        this.shiptabForm.datetime.LeaveTime = this.shiptabForm.datetime.Date + ' ' + LeaveTime.getHours() + ':' + LeaveTime.getMinutes()
      } else {
        this.shiptabForm.datetime.LeaveTime = ''
      }
      if (this.shiptabForm.datetime.TargetTime) {
        let TargetTime = new Date(this.shiptabForm.datetime.TargetTime)
        this.shiptabForm.datetime.TargetTime = this.shiptabForm.datetime.TargetDate + ' ' + TargetTime.getHours() + ':' + TargetTime.getMinutes()
      } else {
        this.shiptabForm.datetime.TargetTime = ''
      }
      this.timerDiff()
    },
    timerDiff() {
      if (this.shiptabForm.datetime.TargetTime === '' || this.shiptabForm.datetime.LeaveTime === '') {
        this.shiptabForm.datetime.shipMinuteStr = ''
        this.shiptabForm.datetime.ShipMinute = ''
        return
      }
      let LeaveDate = new Date(this.shiptabForm.datetime.Date)
      let TargetDate = new Date(this.shiptabForm.datetime.TargetDate)
      this.shiptabForm.datetime.Date = LeaveDate.getFullYear() + '-' + (LeaveDate.getMonth() + 1) + '-' + LeaveDate.getDate()
      this.shiptabForm.datetime.TargetDate = TargetDate.getFullYear() + '-' + (TargetDate.getMonth() + 1) + '-' + TargetDate.getDate()
      let LeaveTime = new Date(this.shiptabForm.datetime.LeaveTime)
      this.shiptabForm.datetime.LeaveTime = this.shiptabForm.datetime.Date + ' ' + LeaveTime.getHours() + ':' + LeaveTime.getMinutes()
      let TargetTime = new Date(this.shiptabForm.datetime.TargetTime)
      this.shiptabForm.datetime.TargetTime = this.shiptabForm.datetime.TargetDate + ' ' + TargetTime.getHours() + ':' + TargetTime.getMinutes()
      let diffArr = commonFunc.timerDiff(this.shiptabForm.datetime.LeaveTime, this.shiptabForm.datetime.TargetTime)
      if (diffArr.minutesDiff > 0) {
        this.shiptabForm.datetime.shipMinuteStr = diffArr.hourminDiff
        this.shiptabForm.datetime.ShipMinute = diffArr.minutesDiff
      } else {
        this.shiptabForm.datetime.shipMinuteStr = ''
        this.shiptabForm.datetime.ShipMinute = ''
      }
    },
    waterHeightBack() {
      if (this.shiptabForm.carType.CarType === '2' && !(this.shiptabForm.HeightBack > 0)) {
        this.shiptabForm.WeightTwo = ''
        this.shiptabForm.RealHeightBack = ''
        this.shiptabForm.RealWeightTwo = ''
        this.shiptabForm.WaterNumTwo = ''
      }
      if (this.shiptabForm.carType.CarType === '2' && !(this.shiptabForm.HeightFront > 0)) {
        this.shiptabForm.HeightBack = ''
        this.shiptabForm.WeightTwo = ''
        this.shiptabForm.RealHeightBack = ''
        this.shiptabForm.RealWeightTwo = ''
        this.shiptabForm.WaterNumTwo = ''
      }
    },
    calWaterNum() {
      if (this.shiptabForm.Invalid1 === '0') {
        if (this.shiptabForm.carType.CarType === '2' && this.shiptabForm.Weight && this.shiptabForm.RealWeight) {
          this.shiptabForm.WaterNumOne = commonFunc.amcSub(this.shiptabForm.Weight, this.shiptabForm.RealWeight)
        }
        this.calTotalWater()
      }
      if (this.shiptabForm.Invalid2 === '0') {
        if (this.shiptabForm.carType.CarType === '2' && this.shiptabForm.WeightTwo && this.shiptabForm.RealWeightTwo) {
          this.shiptabForm.WaterNumTwo = commonFunc.amcSub(this.shiptabForm.WeightTwo, this.shiptabForm.RealWeightTwo)
        }
        this.calTotalWater()
      }
    },
    calTotalWater() {
      if (this.shiptabForm.carType.CarType === '2') {
        this.shiptabForm.TotalWater = commonFunc.amcAdd(this.shiptabForm.WaterAdd, commonFunc.amcAdd(this.shiptabForm.WaterNumOne, this.shiptabForm.WaterNumTwo))
      }
    },
    calDiffWeight() {
      if (this.shiptabForm.carType.CarType === '1' && this.shiptabForm.Weight && this.shiptabForm.RealWeight) {
        this.shiptabForm.DiffWeight = commonFunc.amcSub(this.shiptabForm.RealWeight, this.shiptabForm.Weight)
      } else {

      }
    }, // tag标签 方法
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },
    showInput() {
      // this.dynamicTags.length === 0 &&
      if (this.shiptabForm.truck.CarNo === '') {
        this.$message({
          message: '请先选择车牌',
          type: 'warning'
        })
        return
      }
      if (this.dynamicTags.length >= this.shiptabForm.sealNum) {
        this.$message({
          message: '铅封数已满！',
          type: 'warning'
        })
        return
      }
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm() {
      let ret2 = this.dynamicTags.findIndex((v) => {
        return v === this.inputValue
      })
      if (ret2 >= 0) {
        this.$message({
          message: '铅封号重复！',
          type: 'warning'
        })
        this.inputVisible = false
        this.inputValue = ''
        return
      }
      let inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
      this.shiptabForm.SealNo = this.dynamicTags.join('/')
    },
    convertToLateDate() { // 格式化时间，获取当前时间的一个月后的时间值
      let data = new Date()
      let Da = new Date(data.getTime() - 24 * 60 * 60 * 1000 * 30)
      let y = Da.getFullYear()
      let m = Da.getMonth() + 1
      let d = Da.getDate()
      return y + '-' + m + '-' + d
    },
    handleSizeChange(val) {
      this.pagination.pagesize = val
      this.pagination.currentPage = 1
      this.shipList_well()
    },
    handleCurrentChange(val) {
      this.pagination.currentPage = val
      this.shipList_well()
    },
    handleSizeChange2(val) {
      this.pagination2.pagesize = val
      this.pagination.currentPage = 1
      this.shipList_well()
    },
    handleCurrentChange2(val) {
      this.pagination2.currentPage = val
      this.shipList_well()
    },
    assemblelinks() {
      let linksStatus = ''
      if (this.identity.Identity === '81') {
        linksStatus = 0
      } else if (this.identity.Identity === '82') {
        linksStatus = 1
      } else if (this.identity.Identity === '83') {
        linksStatus = 0
      } if (this.identity.Identity === '84') {
        linksStatus = 3
      }
      this.reportfile = this.filepdf + 'ImportExcel.aspx?action=daily&Status=' + linksStatus + '&CarType=' + this.shiptabForm.carType.CarType + '&StartTime=' + this.datepickervalue[0] + '&EndTime=' + this.datepickervalue[1] + '&TagId=' + this.search.TagId + '&DepartmentId=' + this.search.Tag_DepartmentId + '&DepartmentLev=' + this.search.DepartmentLev
    },
    async getshipplaces() {
      let conditionsParams = {
        // 'PageNo': this.pagination.currentPage,
        // 'PageSize': this.pagination.pagesize
      }
      let resData = await shipplaceApi.getallshipplacelist(conditionsParams)
      if (resData.status === '000') {
        this.shiptabForm.shipplace.shipplacelist = resData.data.record
        // localStorage.setItem('shipplaces', JSON.stringify(mockData.shipplaces))
      } else {
        this.$message.error('获取失败！')
      }
    },
    async getshipWaterplaces() {
      let conditionsParams = {
        // 'PageNo': this.pagination.currentPage,
        // 'PageSize': this.pagination.pagesize
      }
      let resData = await shipplaceApi.getWatershipplacelist(conditionsParams)
      if (resData.status === '000') {
        this.shiptabForm.shipplace.shipplacelist = resData.data.record
        this.ShipplaceWaterlist = resData.data.record
        if (this.shiptabForm.carType.CarType === '2') {
          this.shiptabForm.shipplace.shipplacelist = this.ShipplaceWaterlist
        }
      } else {
        this.$message.error('获取失败！')
      }
    },
    async getshipOilplaces() {
      let conditionsParams = {
        // 'PageNo': this.pagination.currentPage,
        // 'PageSize': this.pagination.pagesize
      }
      let resData = await shipplaceApi.getOilshipplacelist(conditionsParams)
      if (resData.status === '000') {
        this.shiptabForm.shipplace.shipplacelist = resData.data.record
        this.ShipplaceOillist = resData.data.record
        if (this.shiptabForm.carType.CarType === '1') {
          this.shiptabForm.shipplace.shipplacelist = this.ShipplaceOillist
        }
      } else {
        this.$message.error('获取失败！')
      }
    },
    async getTags_dep() {
      let conditionsParams = {}
      let resData = await tagsApi.getTags_dep(conditionsParams)
      if (resData.status === '000') {
        this.Tagslist = this.TagslistArr(resData.data.record)
        commonFunc.myConsole(this.Tagslist)
        commonFunc.myConsole(this.TagsArrlist)
      } else {
        this.$message.error('获取失败！')
      }
    },
    getTagsinsearch(value) { // 数据返回结构 与 Cascader 插件差异  处理后的数据在插件中 点击后也需做以下判断
      let len = value.length
      if (len > 0) {
        this.search.TagId = value[0]
        if (len === 1) { // Cascader插件绑定model 长度为1 表示选择 区域标签 TagId确定标识 DepartmentId传空
          this.search.Tag_DepartmentId = ''
        } else { // Cascader插件绑定model 长度为大于1 表示选择 区域标签下的某一进站 DepartmentId确定标识  TagId传相应区域id
          this.search.Tag_DepartmentId = value[1]
        }
      } else {
        this.search.TagId = ''
        this.search.Tag_DepartmentId = ''
      }
      // this.shipList_well()
    },
    TagslistArr(Tagslist, key) {
      let depopt = ''
      let newArr = []
      let tags = []
      Tagslist.filter((item, index, arr) => {
        tags.push(item)
        let ListDepartment = []
        item.ListDepartment.filter((itm, ind, arr2) => {
          depopt = {
            'DepartmentId': itm.DepartmentId,
            'DepartmentLev': itm.DepartmentLev,
            'DepartmentName': itm.DepartmentName,
            'TagId': itm.DepartmentId, // 插件兼容性需求  TagId 字段 存放DepartmentId
            'realTagId': item.TagId, // 存放真实TagId
            'TagName': itm.DepartmentName
          }
          tags.push(depopt)
          ListDepartment.push(depopt)
        })

        item.ListDepartment = [].concat(ListDepartment)
        this.TagsArrlist = [].concat(tags)
        newArr.push(item)
      })
      return newArr
    },
    async getDepartment_wkcenter() {
      let conditionsParams = {}
      let resData = await departmentApi.getDepartmentwkcenter(conditionsParams)
      if (resData.status === '000') {
        this.departmentwelllist = resData.data.record
        if (resData.data.record.length > 0) {
          this.departmentwelArr(resData.data.record, 'Well')
        }
      } else {
        this.$message.error('获取失败！')
      }
    },
    getDepartinsearch(value) { // DepartmentLev 等信息组装
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
      // this.shipList_well()
    },
    async getTranStationOillist() {
      let conditionsParams = {}
      let resData = await tranStationApi.getTranStation_listOil(conditionsParams)
      if (resData.status === '000') {
        this.shiptabForm.tranStation.tranStationlist = resData.data.record
      } else {
        this.$message.error('获取失败！')
      }
    },
    async getTranStationWaterlist() {
      let conditionsParams = {}
      let resData = await tranStationApi.getTranStation_listWater(conditionsParams)
      if (resData.status === '000') {
        this.shiptabForm.tranStation.tranStationlist = resData.data.record
      } else {
        this.$message.error('获取失败！')
      }
    },
    async getsigners() {
      let conditionsParams = {
        // 'PageNo': this.pagination.currentPage,
        // 'PageSize': this.pagination.pagesize
      }
      let resData = await signerApi.getallsignerlist(conditionsParams)
      if (resData.status === '000') {
        this.shiptabForm.signer.signerlist = resData.data.record
      } else {
        this.$message.error('获取失败！')
      }
    },
    async getOiltrucks() {
      let conditionsParams = {
        // 'PageNo': this.pagination.currentPage,
        // 'PageSize': this.pagination.pagesize
      }
      let resData = await trucksApi.getOiltruckslist(conditionsParams)
      if (resData.status === '000') {
        this.TruckOillist = resData.data.record
        if (this.shiptabForm.carType.CarType === '1') {
          this.shiptabForm.truck.trucklist = this.TruckOillist
        }
      } else {
        this.$message.error('获取失败！')
      }
    },
    async getWatertrucks() {
      let conditionsParams = {
        // 'PageNo': this.pagination.currentPage,
        // 'PageSize': this.pagination.pagesize
      }
      let resData = await trucksApi.getWatertruckslist(conditionsParams)
      if (resData.status === '000') {
        this.TruckWaterlist = resData.data.record
        if (this.shiptabForm.carType.CarType === '2') {
          this.shiptabForm.truck.trucklist = this.TruckWaterlist
        }
      } else {
        this.$message.error('获取失败！')
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
    },
    async getOildrivers() {
      let conditionsParams = {
        // 'PageNo': this.pagination.currentPage,
        // 'PageSize': this.pagination.pagesize
      }
      let resData = await driversApi.getOildriverslist(conditionsParams)
      if (resData.status === '000') {
        this.DriversOillist = resData.data.record
        if (this.shiptabForm.carType.CarType === '1') {
          this.shiptabForm.driver.driverlist = this.DriversOillist
        }
      } else {
        this.$message.error('获取失败！')
      }
    },
    async getWaterdrivers() {
      let conditionsParams = {
        // 'PageNo': this.pagination.currentPage,
        // 'PageSize': this.pagination.pagesize
      }
      let resData = await driversApi.getWaterdriverslist(conditionsParams)
      if (resData.status === '000') {
        this.DriversWaterlist = resData.data.record
        if (this.shiptabForm.carType.CarType === '2') {
          this.shiptabForm.driver.driverlist = this.DriversWaterlist
        }
      } else {
        this.$message.error('获取失败！')
      }
    },
    minuteToTime(shipMinute) {
      let Hour = parseInt(shipMinute / 60)
      let oMinute = shipMinute % 60
      let oDaye = parseInt(Hour / 24)
      let oHour = Hour % 24
      // oHour = oHour > 9 ? oHour : ('0' + oHour)
      // oMinute = oMinute > 9 ? oMinute : ('0' + oMinute)
      let str = ''
      if (oDaye > 0) {
        // str = oDaye + ':' + oHour + ':' + oMinute
        str = oDaye + '天' + oHour + '时' + oMinute + '分'
      } else {
        // str = oHour + ':' + oMinute
        str = oHour + '时' + oMinute + '分'
      }
      return str
    },
    rowStyle({row, rowIndex}) {
      if (rowIndex === 0) {
        return ''
      } else {
        return ''
      }
    }
  }
}
</script>
<style lang="scss">
.yybcor > .el-form-item__label {
    text-align: right;
    float: left;
    font-size: 14px;
    color: #f56c6c;
    line-height: 40px;
    padding: 0 12px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
.yybinputbor>.el-input__inner {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    // border: 1px solid #f56c6c;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 32px;
    line-height: 32px;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
}
.yybinputicon > .el-input__inner {
    padding-left: 30px;
    padding-right: 30px;
}
// 处理input type = number的上下箭头
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
 -webkit-appearance: none;
}
input[type="number"] {
 -moz-appearance: textfield;
}
#shiptab {
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
#picDcm {
  // .el-upload--picture-card {
  //     background-color: #fbfdff;
  //     border: 1px dashed #c0ccda;
  //     border-radius: 6px;
  //     -webkit-box-sizing: border-box;
  //     box-sizing: border-box;
  //     width: 50px;
  //     height: 50px;
  //     line-height: 58px;
  //     vertical-align: top;
  // }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
#Psc-Main {
  .el-button+.el-button {
      margin-left: 5px;
  }
  .el-dialog__title {
      line-height: 22px;
      font-size: 16px;
  }
  .el-dialog__footer {
      padding: 0px 20px 10px;
  }
  .el-dialog__header {
      padding: 10px 20px 0px;
  }
  .el-form-item--small .el-form-item__content, .el-form-item--small .el-form-item__label {
      line-height: 40px;
  }
  .el-form-item {
      margin-bottom: 5px;
  }
  .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
      margin-bottom: 5px;
  }
  .el-divider{
      display: block;
      height: 1px;
      width: 100%;
      margin: 24px 0;
  }
  .el-input__inner {
      font-size: 12px;
  }
  .el-dialog__body {
      padding: 10px 20px 10px 20px;
  }
  .el-form-item__label {
      font-size: 12px;
  }
  .el-date-editor.el-input, .el-date-editor.el-input__inner {
      width: 175px;
  }
  .block .el-date-editor.el-input, .el-date-editor.el-input__inner {
      width: 350px;
  }
  .el-form--inline .el-form-item__content {
      display: inline-block;
      vertical-align: top;
      width: 175px;
  }
  #tag-el-form-item__content .el-form-item__content {
      display: inline-block;
      vertical-align: top;
      width: 175px;
  }
  // .el-select {
  //     display: block;
  //     position: relative;
  // }
  .cell .el-button--small, .el-button--small.is-round {
      padding: 5px 10px;
  }
  .el-table thead {
      color: #333333;
      // font-weight: bold;
  }
  .el-table td, .el-table th {
      padding: 5px 0;
      min-width: 0;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      text-overflow: ellipsis;
      vertical-align: middle;
      position: relative;
      text-align: left;
  }
  .el-pagination__sizes .el-input .el-input__inner:hover {
      border-color: #FF6D18;
  }
  .el-tag {
    margin-right: 10px;
  }
  .button-new-tag {
    margin-left: 0px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
  .el-link.el-link--primary {
    color: #409eff;
  }
  .el-link.el-link--primary2 {
    color: #333333;
  }

.el-link {
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    vertical-align: middle;
    position: relative;
    text-decoration: none;
    outline: none;
    cursor: pointer;
    padding: 0;
    font-size: 12px;
    font-weight: 500;
  }
  .el-link.el-link--primary.is-underline:hover:after {
    border-color: #409eff;
}
.el-link.is-underline2:hover:after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    height: 0;
    bottom: 0;
    border-bottom: 1px solid #333333;
}
.el-link.is-underline:hover:after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    height: 0;
    bottom: 0;
    border-bottom: 1px solid #409eff;
}
.el-link.el-link--primary:after {
    border-color: #409eff;
}
}
</style>
