<template>
<div class="hdp-uf hdp-uf-dc main-container hdp-w-100">
  <div class="hdp-uf hdp-uf-dc hdp-w-100">
    <div class="hdp-uf hdp-w-100 hdp-uf-dc" style="background:#FFFFFF;padding:10px">
      <div class="hdp-uf" style="margin-top:15px;display: inline-block;">
        <div class="hdp-uf" style="width:270px;display: inline;margin-right:15px">
          <template>
            <el-date-picker style="width: 125px;;display: inline-block;"
              v-model="datepickervalue[0]" size="small" @change="datepickerValuechange"
              align="right"
              type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
              placeholder="开始日期">
            </el-date-picker>
            <div class="hdp-uf" style="display: inline-block;">
              <el-col class="line" :span="2" style="text-align: center;width:10px;line-height:16px;">-</el-col>
            </div>
            <el-date-picker style="width: 125px;;display: inline-block;"
              v-model="datepickervalue[1]" size="small" @change="datepickerValuechange"
              align="right"
              type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
              placeholder="结束日期">
            </el-date-picker>
          </template>
        </div>
        <div class="hdp-uf" style="margin:0 15px 5px 0;display: inline-block;">
          <el-cascader expand-trigger="hover" :options="departmentwelllist" :props="departwellcenterProps" v-model="search.selectedwellOptions" @change="getDepartinsearch" change-on-select size="small" placeholder="所属井站" clearable style="width:125px">
          </el-cascader>
        </div>
        <div class="hdp-uf" style="margin:0 15px 5px 0;display: inline-block;">
          <el-select v-model="QueryStatus" size="small" @change="handleClick" placeholder="状态" clearable  style="width:125px">
            <el-option key="0" label="待提交" value="0"></el-option>
            <el-option key="1" label="提交" value="1"></el-option>
            <el-option key="2" label="撤销" value="2"></el-option>
            <el-option key="3" label="完成" value="3"></el-option>
          </el-select>
        </div>
        <div class="hdp-uf" style="margin:0 15px 5px 0;display: inline-block;">
          <el-button @click="gettruckApplylist" size="small" type="primarydel">查询</el-button>
        </div>
        <div v-if="this.carInputRight === '1' || this.carInputRight === '0'" class="hdp-uf psc-font-3" style="margin:0 15px 5px 0;display: inline-block;">
          <el-button @click="addruck('1')" type="primary" size="small">
            <i aria-hidden="true" class="fa  fa-fw fa-plus-square-o" style="font-size: 12px;"></i>
            凝析油</el-button>
        </div>
        <div v-if="this.carInputRight === '2' || this.carInputRight === '0'" class="hdp-uf psc-font-3" style="margin:0 15px 5px 0;display: inline-block;">
          <el-button @click="addruck('2')" type="primary" size="small" style="color: #fff !important;background-color: #409EFF !important;border-color: #409EFF !important;">
            <i aria-hidden="true" class="fa  fa-fw fa-plus-square-o" style="font-size: 12px;"></i>
            气田水</el-button>
        </div>
        <!-- <div class="hdp-uf" style="margin:0 15px 5px 0;display: inline-block">
          <a target="_self" :href='reportfile' class="el-button el-button--primary el-button--small">
            导出excel</a>
        </div> -->
      </div>
      <el-dialog :close-on-click-modal="false" :visible.sync="dialogVisible" v-if="dialogVisible" @close="imageUrlclose" width="800px"  :modal-append-to-body='false'>
        <img width="100%" :src="imageUrl" alt="">
      </el-dialog>
      <el-dialog :close-on-click-modal="false" title="发车" :visible.sync="shiptabFormDialogVisible" v-if="shiptabFormDialogVisible" @close="viewdetailsclose" width="1200px">
        <div class="dialog-content">
          <el-form ref="shiptabForm" :inline="true" :model="shiptabForm" label-width="150px">
            <div class="" style="width:724px;display: inline-block;">
              <el-form-item label="井站" prop="DepartmentId" style="width: 350px">
                <el-select v-model="shiptabForm.tranStation.DepartmentId" size="small" @change="getDepardispatch" disabled placeholder="请选择">
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
                <el-date-picker v-model="shiptabForm.datetime.Date" type="date" size="small" disabled @blur="datechange('Start')" placeholder="选择日期" :picker-options="pickerOptions1" :clearable="false"></el-date-picker>
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
                <el-upload
                  class="avatar-uploader" style="width:175px"
                  :action="uploadip" :show-file-list="false"
                  :disabled="identity.TranStation_disabled"
                  :on-success="handleSuccess"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </div>
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
                v-model="shiptabForm.HeightFront" disabled @blur="waterHeightBack"
                @mousewheel.native.prevent></el-input>
                <div class="hdp-uf hdp-uf-hc" style="width: 10%">/</div>
                <el-input v-if="shiptabForm.Invalid1 === '0' && shiptabForm.waterType.WaterType === '3'" type="number" style="width: 45%" placeholder="液量(方)" v-model="shiptabForm.Weight" @blur="calWaterNum" :disabled="identity.Oilinspd_disabled" @mousewheel.native.prevent></el-input>
                <el-input v-else type="number" style="width: 45%" placeholder="液量(方)" v-model="shiptabForm.Weight" @blur="calWaterNum" disabled @mousewheel.native.prevent></el-input>
                </div>
            </el-form-item>
            <el-form-item v-if="shiptabForm.carType.CarType === '2'" :inline="true" label="拉后" size="small" style="width: 350px">
              <div class="hdp-uf hdp-uf-hc">
                <!-- 拉后液位(cm) -->
                <el-input v-if="shiptabForm.Invalid1 === '0' && shiptabForm.waterType.WaterType === '3'"
                type="number" style="width: 45%" placeholder="液位(cm)"
                v-model="shiptabForm.RealHeightFront" :disabled="identity.Oilinspd_disabled" @mousewheel.native.prevent></el-input>
                <el-input v-else type="number" style="width: 45%" placeholder="液位(cm)" v-model="shiptabForm.RealHeightFront" disabled @mousewheel.native.prevent></el-input>
                <div class="hdp-uf hdp-uf-hc" style="width: 10%">/</div>
                <el-input v-if="shiptabForm.Invalid1 === '0' && shiptabForm.waterType.WaterType === '3'" type="number" style="width: 45%" placeholder="液量(方)" v-model="shiptabForm.RealWeight" @blur="calWaterNum" :disabled="identity.Oilinspd_disabled" @mousewheel.native.prevent></el-input>
                <el-input v-else type="number" style="width: 45%" placeholder="液量(方)" v-model="shiptabForm.RealWeight" @blur="calWaterNum" disabled @mousewheel.native.prevent></el-input>
                </div>
            </el-form-item>
            <el-form-item v-if="shiptabForm.carType.CarType === '2'" :inline="true" label="水量" prop="RealWeight" size="small" style="width: 350px">
              <div class="hdp-uf hdp-uf-hc">
                <el-input v-if="shiptabForm.Invalid1 === '0' || shiptabForm.waterType.WaterType !== '3'" type="number" :disabled="true" readonly="readonly" placeholder="水量(方)" v-model="shiptabForm.WaterNumOne" @mousewheel.native.prevent></el-input>
                <el-input v-else-if="shiptabForm.Invalid1 === '1' && shiptabForm.waterType.WaterType === '3'" type="number" placeholder="水量(方)" v-model="shiptabForm.WaterNumOne" @blur="calTotalWater" @mousewheel.native.prevent></el-input>
                </div>
            </el-form-item>

            <el-form-item v-if="shiptabForm.carType.CarType === '2'" :inline="true" label="水罐2        拉前" prop="Height" size="small" style="width: 350px">
              <!-- <label for="Height" class="el-form-item__label" style="width: 28px;height:40px;float:left;padding-right:2px">拉前</label> -->
              <div class="hdp-uf hdp-uf-hc" >
                <!-- 拉前液位(cm) -->
                <el-input type="number" style="width: 45%" placeholder="液位(cm)" v-if="shiptabForm.Invalid2 === '1' || !(shiptabForm.HeightFront > 0)" v-model="shiptabForm.HeightBack" @blur="waterHeightBack" disabled @mousewheel.native.prevent></el-input>
                <el-input type="number" style="width: 45%" placeholder="液位(cm)" v-else v-model="shiptabForm.HeightBack" @blur="waterHeightBack" :disabled="identity.Oilinspd_disabled" @mousewheel.native.prevent></el-input>
                <div class="hdp-uf hdp-uf-hc" style="width: 10%">/</div>
                <el-input type="number" style="width: 45%" placeholder="液量(方)" v-if="shiptabForm.Invalid2 === '1' || !(shiptabForm.HeightBack > 0)" v-model="shiptabForm.WeightTwo" @blur="calWaterNum" disabled @mousewheel.native.prevent></el-input>
                <el-input type="number" style="width: 45%" placeholder="液量(方)" v-else v-model="shiptabForm.WeightTwo" @blur="calWaterNum" :disabled="identity.Oilinspd_disabled" @mousewheel.native.prevent></el-input>
              </div>
            </el-form-item>
            <el-form-item v-if="shiptabForm.carType.CarType === '2'" :inline="true" label="拉后" size="small" style="width: 350px">
              <!-- <label for="Height" class="el-form-item__label" style="width: 28px;height:40px;float:left;padding-right:2px"></label> -->
              <div class="hdp-uf hdp-uf-hc">
                <!-- 拉后液位(cm) -->
                <el-input type="number" style="width: 45%" placeholder="液位(cm)" v-if="shiptabForm.Invalid2 === '1' || !(shiptabForm.HeightBack > 0)" v-model="shiptabForm.RealHeightBack" disabled @mousewheel.native.prevent></el-input>
                <el-input type="number" style="width: 45%" placeholder="液位(cm)" v-else v-model="shiptabForm.RealHeightBack" :disabled="identity.Oilinspd_disabled" @mousewheel.native.prevent></el-input>
                <div class="hdp-uf hdp-uf-hc" style="width: 10%">/</div>
                <el-input type="number" style="width: 45%" placeholder="液量(方)" v-if="shiptabForm.Invalid2 === '1' || !(shiptabForm.HeightBack > 0)" v-model="shiptabForm.RealWeightTwo" @blur="calWaterNum" disabled @mousewheel.native.prevent></el-input>
                <el-input type="number" style="width: 45%" placeholder="液量(方)" v-else v-model="shiptabForm.RealWeightTwo" @blur="calWaterNum" :disabled="identity.Oilinspd_disabled" @mousewheel.native.prevent></el-input>
              </div>
            </el-form-item>
            <el-form-item v-if="shiptabForm.carType.CarType === '2'" :inline="true" label="水量" prop="RealWeight" size="small" style="width: 350px">
              <div class="hdp-uf hdp-uf-hc">
                <el-input v-if="shiptabForm.Invalid2 === '0' || shiptabForm.waterType.WaterType !== '3'" type="number" :disabled="true" readonly="readonly" placeholder="水量(方)" v-model="shiptabForm.WaterNumTwo" @mousewheel.native.prevent></el-input>
                <el-input v-else-if="shiptabForm.Invalid2 === '1' && shiptabForm.waterType.WaterType === '3'" type="number" placeholder="水量(方)" v-model="shiptabForm.WaterNumTwo"  @blur="calTotalWater" @mousewheel.native.prevent></el-input>
              </div>
            </el-form-item>
            <el-form-item v-if="shiptabForm.carType.CarType === '2'" label="签认人" size="small" style="width: 350px">
              <el-input v-model="shiptabForm.signer.SignerName" :disabled="identity.TranStation_disabled" @mousewheel.native.prevent></el-input>
            </el-form-item>
            <el-form-item v-if="shiptabForm.carType.CarType === '2'" label="补水量(方)" prop="WaterAdd" size="small" style="width:350px">
              <el-input type="number" v-model="shiptabForm.WaterAdd" @blur="calTotalWater" @mousewheel.native.prevent :disabled="identity.Oilinspd_disabled" ></el-input>
            </el-form-item>
            <el-form-item v-if="shiptabForm.carType.CarType === '2'" label="签单量(方)" prop="TotalWater" size="small" style="width:350px">
              <el-input type="number"  v-model="shiptabForm.TotalWater" @mousewheel.native.prevent :disabled="identity.Oilinspd_disabled" ></el-input>
            </el-form-item>
            <el-form-item v-if="shiptabForm.carType.CarType === '2'" label="记录人" size="small" style="width: 350px">
              <el-input v-model="shiptabForm.recorder.RecorderName" :disabled="identity.TranStation_disabled" @mousewheel.native.prevent></el-input>
            </el-form-item>
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
            <el-form-item :class="[shiptabForm.carType.CarType === '1'?'yybcor':'']" label="到达日期" prop="TargetDate" style="width: 350px">
              <el-date-picker class="yybinputbor yybinputicon" v-model="shiptabForm.datetime.TargetDate" type="date" size="small" :disabled="identity.Oilinspd_disabled" @blur="datechange('Arrival')" placeholder="选择日期" :picker-options="pickerOptions1" :clearable="false"></el-date-picker>
            </el-form-item>
            <el-form-item :class="[shiptabForm.carType.CarType === '1'?'yybcor':'']" label="到达时间" prop="TargetTime" style="width: 350px">
              <el-time-picker class="yybinputbor yybinputicon" v-if="shiptabForm.carType.CarType === '2' && shiptabForm.waterType.WaterType !== '3'" v-model="shiptabForm.datetime.TargetTime" format="HH:mm"  @blur="timerDiff" size="small" disabled :clearable="false"></el-time-picker>
              <el-time-picker class="yybinputbor yybinputicon" v-else v-model="shiptabForm.datetime.TargetTime" format="HH:mm"  @blur="timerDiff" size="small" :disabled="identity.Oilinspd_disabled" :clearable="false"></el-time-picker>
            </el-form-item>
            <el-form-item :class="[shiptabForm.carType.CarType === '1'?'yybcor':'']" label="在途时间(分钟)" size="small" style="width:350px">
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
            <el-button v-if="this.identity.Identity === '81' && this.shiptabForm.carType.CarType === '1' && this.shiptabForm.Status !== '3'" size="small" @click="dispatchinfo(0)" type="primary">保 存</el-button>
            <el-button v-if="this.identity.Identity === '81' && this.shiptabForm.carType.CarType === '1' && this.IsToCheck === '1' && this.shiptabForm.Status !== '3'" size="small" @click="dispatchinfo(1)" type="primary">提 交</el-button>
            <el-button v-if="this.identity.Identity === '81' && this.shiptabForm.carType.CarType === '1' && this.IsToCheck === '1' && this.shiptabForm.Status === '3'" size="small" @click="dispatchinfo(3)" type="primary">提 交</el-button>
            <el-button v-if="this.identity.Identity === '81' && this.shiptabForm.carType.CarType === '1' && this.IsToCheck === '0' && this.shiptabForm.Status !== '3'" size="small" @click="dispatchinfo(2)" type="primary">提 交</el-button>
            <el-button v-if="this.identity.Identity === '81' && this.shiptabForm.carType.CarType === '1' && this.IsToCheck === '0' && this.shiptabForm.Status === '3'" size="small" @click="dispatchinfo(3)" type="primary">提 交</el-button>

            <el-button v-if="this.identity.Identity === '81' && this.shiptabForm.carType.CarType === '2' && this.shiptabForm.Status !== '3'" size="small" @click="dispatchinfo(0)" type="primary">保 存</el-button>
            <el-button v-if="this.identity.Identity === '81' && this.shiptabForm.carType.CarType === '2'" size="small" @click="dispatchinfo(2)" type="primary">提 交</el-button>
          </span>
        </span>
      </el-dialog>
      <el-dialog :close-on-click-modal="false" title="编辑" :visible.sync="shipplaceFormDialogVisible" v-if="shipplaceFormDialogVisible" width="800px">
        <div class="dialog-content">
          <el-form ref="Form" :inline="true" :model="Form"  label-width="150px">
            <el-form-item label="是否备用车" prop="" size="small" style="width:350px">
              <el-radio v-model="Form.IsBackUp" :disabled='Form.Status === 3 || Form.Status === 1' label="1" style="margin-left:10px">是</el-radio>
              <el-radio v-model="Form.IsBackUp" :disabled='Form.Status === 3 || Form.Status === 1' label="0">否</el-radio>
            </el-form-item>
            <el-form-item label="用车机构" prop="DepartmentId" style="width: 350px">
              <el-select v-model="Form.DepartmentId" :disabled='Form.Status === 3 || Form.Status === 1' size="small" @change="getDepartinform" placeholder="请选择">
                <el-option v-for="item in tranStationlist" :key="item.DepartmentId" :label="item.DepartmentName" :value="item.DepartmentId"></el-option>
              </el-select>
            </el-form-item>
            <!-- <el-form-item label="车辆个数" prop="Num" style="width: 350px">
              <el-input-number v-model="Form.Num" :disabled='Form.Status === 3 || Form.Status === 1'  @blur="NumChange" size="small" :min="1" :max="100" label="数量" style="width;100%"></el-input-number>
            </el-form-item> -->
            <el-form-item v-if="CarType === '2'" label="车型" prop="AmountNum" style="width: 350px">
              <el-select v-model="Form.AmountNum" size="small" :disabled='Form.Status === 3 || Form.Status === 1' placeholder="请选择">
                <el-option key="16" label="16方" value="16"></el-option>
                <el-option key="25" label="25方" value="25"></el-option>
                <el-option key="30" label="30方" value="30"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="CarType === '1'" label="车型" prop="AmountNum" style="width: 350px">
              <el-select v-model="Form.AmountNum" size="small" :disabled='Form.Status === 3 || Form.Status === 1' placeholder="请选择">
                <el-option key="7" label="7吨" value="7"></el-option>
                <el-option key="11" label="11吨" value="11"></el-option>
                <el-option key="13" label="13吨" value="13"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="用车日期" prop="Date" style="width: 350px">
              <el-date-picker v-model="Form.Date" :disabled='Form.Status === 3 || Form.Status === 1' type="date" size="small" placeholder="选择日期" :picker-options="pickerOptions2" :clearable="false"></el-date-picker>
            </el-form-item>
            <el-form-item v-if="Form.IsBackUp === '0'" label="到站时间" prop="ArrivalTime" style="width: 350px">
              <el-time-picker v-model="Form.ArriveTime" :disabled='Form.Status === 3 || Form.Status === 1' format="HH:mm" size="small" :clearable="false"></el-time-picker>
            </el-form-item>
            <el-form-item label="备注" prop="" size="small" style="width:700px">
              <el-input v-model="Form.Description" :disabled='iscancel || (Form.Status === 1 || Form.Status === 3)' type="textarea" :rows="3" placeholder="请输入备注" style="width:540px"></el-input>
            </el-form-item>
            <el-form-item v-if="iscancel && Form.Status === 1" label="撤销原因" prop="" size="small" style="width:700px">
              <el-input v-model="Form.Remark" type="textarea" :rows="3" placeholder="请输入撤销原因" style="width:540px"></el-input>
            </el-form-item>
            <el-form-item v-if="Form.Status === 2" label="撤销原因" prop="" size="small" style="width:700px">
              <el-input v-model="Form.Remark" :disabled='Form.Status === 2' type="textarea" :rows="3" placeholder="" style="width:540px"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="shipplaceFormDialogVisible = false" type="primarydel">取 消</el-button>
          <el-button v-if="Form.Status === 0 || Form.Status === 2" size="small" @click="editinfo(0)" type="primary">保 存</el-button>
          <el-button v-if="Form.Status === 0 || Form.Status === 2" size="small" @click="editinfo(1)" type="primary">提 交</el-button>
          <el-button v-if="Form.Status === 1 && iscancel" size="small" @click="cancel(Form.ID)" type="primary">撤 销</el-button>
        </span>
      </el-dialog>
    </div>
    <div id='Applytab' class="hdp-uf hdp-w-100 hdp-uf-dc" style="background:#FFFFFF;padding: 10px 10px 20px 10px;;margin-top:10px">
      <template>
        <el-tabs v-model="CarType" type="card" @tab-click="tabsClick">
          <el-tab-pane v-if="this.carInputRight === '1' || this.carInputRight === '0'" label="凝析油" name="1"></el-tab-pane>
          <el-tab-pane v-if="this.carInputRight === '2' || this.carInputRight === '0'" label="气田水" name="2"></el-tab-pane>
        </el-tabs>
      </template>
      <el-table :data="truckApplylist" stripe border>
        <el-table-column prop="DepartmentName" label="用车机构" width="200">
        </el-table-column>
        <el-table-column prop="CarType" label="计划 / 临时" width="80">
          <template slot-scope="scope">
            <span v-if="scope.row.IsPlan === 1">计划用车</span>
            <span v-else-if="scope.row.IsPlan === 0">临时用车</span>
          </template>
        </el-table-column>
        <el-table-column prop="AmountNum" label="车型" width="80">
          <template slot-scope="scope">
            <span v-if="CarType === '2'">{{scope.row.AmountNum}}方</span>
            <span v-if="CarType === '1'">{{scope.row.AmountNum}}吨</span>
          </template>
        </el-table-column>
        <el-table-column prop="Num" label="车辆数" width="80">
          <template slot-scope="scope">
            <span>{{scope.row.ShipNum}} / {{scope.row.Num}}</span>
          </template>
        </el-table-column>
        <el-table-column label="用车日期" width="120">
          <template slot-scope="scope">
            <span>{{scope.row.Date.substr(0,10)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="到站时间" width="100">
          <template slot-scope="scope">
            <span>{{scope.row.ArriveTime}}</span>
          </template>
        </el-table-column>
        <el-table-column label="申请时间" width="150">
          <template slot-scope="scope">
            <span>{{scope.row.AddTime.substr(0,10)}}  {{scope.row.AddTime.substr(11,5)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否为备车" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.IsBackUp === 1">是</span>
            <span v-else-if="scope.row.IsBackUp === 0">否</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.Status === 0" >待提交</span>
            <span v-else-if="scope.row.Status === 1" style="color:#409EFF">提交</span>
            <span v-else-if="scope.row.Status === 2" style="color:#f56c6c">撤销</span>
            <span v-else-if="scope.row.Status === 3" style="color:#67c23a">完成</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button v-if="scope.row.Status === 3 || scope.row.Status === 1" @click.native.prevent="updateRow(scope.$index, truckApplylist, 0)" type="primarydel" size="small">
              查看
            </el-button>
            <el-button v-if="scope.row.Status === 3 && scope.row.Num > scope.row.ShipNum" @click.native.prevent="dispatchtruck(scope.$index, truckApplylist, 0)" type="primary" size="small">
              发车
            </el-button>
            <el-button v-if="scope.row.Status === 1" @click.native.prevent="updateRow(scope.$index, truckApplylist, 1)" type="primarydel" size="small">
              撤销
            </el-button>
            <el-button v-if="scope.row.Status === 0 || scope.row.Status === 2" @click.native.prevent="updateRow(scope.$index, truckApplylist, 0)" type="primarydel" size="small">
              编辑
            </el-button>
            <el-button v-if="scope.row.Status === 0" @click.native.prevent="deleteRow(scope.$index, truckApplylist)" type="primarydel" size="small">
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
</template>
<script>
import config from '../../config/config.js'
import commonFunc from '../../api/common/common.js'
import shiptabApi from '../../api/shiptab.js'
import truckapplyApi from '../../api/truckapply.js'
import departmentApi from '../../api/department.js'
import shipplaceApi from '../../api/shipplace.js'
import tranStationApi from '../../api/tranStation.js'
import tagsApi from '../../api/tags.js'
import driversApi from '../../api/drivers.js'
import trucksApi from '../../api/trucks.js'
import signerApi from '../../api/signer.js'
export default {
  data() {
    return {
      currentMenuLeadListsData: [{
        'name': this.$route.query.name,
        'url': '/#' + this.$route.query.link
      }, {
        'name': this.$route.query.itemname,
        'url': '/#' + this.$route.query.link
      }],
      title: {
        firstTitle: this.$route.query.itemname
      },
      datepickervalue: [commonFunc.getnowDate(new Date(), -30), commonFunc.getnowDate(new Date(), 1)], // 时间段选择
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      // pickerOptions3: {
      //   disabledDate(time) {
      //     return time.getTime()
      //   }
      // },
      pickerOptions2: {
        disabledDate(time) {
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 1)
          return time.getTime() < start
        }
      },
      CarType: '1',
      QueryStatus: '',
      iscancel: false,
      shipplaceFormDialogVisible: false,

      tranStationlist: [],
      Form: {
        'ID': 0,
        'Status': 0,
        'AmountNum': '',
        'IsBackUp': '0',
        'Remark': '',
        'Description': '',
        'Date': new Date(),
        'ArriveTime': '',
        'Num': 1,
        'CarType': '',
        'DepartmentId': '',
        'DepartmentLev': '',
        'DepartmentName': ''
      },
      shipplacelist: [],
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
      truckApplylist: [],
      pagination: {
        totalNum: 0,
        currentPage: 1,
        pagesizes: [5, 8, 10, 20],
        pagesize: 10
      },

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
      // activeName: '1',

      filepdf: config.APISERVER.filepdf,
      reportfile: '',
      uploadip: config.APISERVER.uploadip,
      imageip: config.APISERVER.ip,
      imageUrl: '',
      ImagePathlist: [],
      dialogVisible: false,

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
      carInputRight: '0',

      TruckOillist: [],
      TruckWaterlist: [],
      DriversWaterlist: [],
      DriversOillist: [],
      ShipplaceWaterlist: [], //
      ShipplaceOillist: [],
      shiptabTypevalue: '0',
      shiptablist: [],
      shipplacevalue: '',
      tranStationvalue: '',
      searchWaterType: ''
    }
  },
  mounted() { // el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子
    this.$commonFunc.myConsole('mounted ======> members')
    document.title = this.title.firstTitle
    this.init()
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
    async init() {
      this.$commonFunc.myConsole('渲染完成后 ===> 开始默认加载相应的逻辑')
      if (commonFunc.isDefine(this.$route.query.link)) {
        localStorage.setItem('currentMenuLeadListsData', JSON.stringify(this.currentMenuLeadListsData))
      } else {
        this.currentMenuLeadListsData = JSON.parse(localStorage.getItem('currentMenuLeadListsData'))
        this.title.firstTitle = this.currentMenuLeadListsData[this.currentMenuLeadListsData.length - 1].name
        document.title = this.title.firstTitle
      }
      this.$store.dispatch('menuLeadLists/setMenuLeadListsData', this.currentMenuLeadListsData)

      this.carInputRight = localStorage.getItem('CarInputRight')
      if (this.carInputRight === '2') {
        this.CarType = '2'
      }
      if (this.CarType === '1') {
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

      this.getDepartment_wkcenter()
      this.gettruckApplylist()
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
    async gettruckApplylist() {
      let conditionsParams = {
        'CarType': this.CarType,
        'QueryStatus': this.QueryStatus,
        'DepartmentLev': this.search.DepartmentLev,
        'StartTime': this.datepickervalue[0] || '', // 开始日期
        'EndTime': this.datepickervalue[1] || '', // 结束日期
        'PageNo': this.pagination.currentPage,
        'PageSize': this.pagination.pagesize
      }
      commonFunc.myConsole(conditionsParams)
      let resData = await truckapplyApi.getApplylist(conditionsParams)
      if (resData.status === '000') {
        this.truckApplylist = resData.data.record
        this.pagination.totalNum = resData.data.totalNum
      } else {
        this.$message.error('获取失败！')
      }
    },
    tabsClick(tab, event) {
      this.shiptabForm.carType.CarType = tab.name
      if (this.shiptabForm.carType.CarType === '1') {
        this.shiptabForm.truck.trucklist = this.TruckOillist
        this.shiptabForm.driver.driverlist = this.DriversOillist
        this.shiptabForm.shipplace.shipplacelist = this.ShipplaceOillist
      } else {
        this.shiptabForm.truck.trucklist = this.TruckWaterlist
        this.shiptabForm.driver.driverlist = this.DriversWaterlist
        this.getshipWaterplaces()
      }
      this.assemblelinks()
      this.identitydisabled()

      this.CarType = tab.name
      this.gettruckApplylist()
    },
    handleClick() {},
    NumChange(value) {
      this.Form.Num = Math.floor(this.Form.Num)
    },
    deleteRow(index, resMembersDataArr) {
      this.$confirm('是否确认删除该申请信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.CarApplydel(index, resMembersDataArr)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    async CarApplydel(index, resMembersDataArr) {
      let conditionsParams = {
        'ArrayID': [resMembersDataArr[index].ID]
      }
      commonFunc.myConsole(conditionsParams)
      let resData = await truckapplyApi.CarApply_del(conditionsParams)
      if (resData.status === '000') {
        this.truckApplylist.splice(index, 1)
        this.gettruckApplylist()
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
    async cancel(ID) {
      if (!this.Form.Remark) {
        this.$message.warning('请备注撤销申请的原因')
        return
      }
      let conditionsParams = {
        'ID': ID,
        'Remark': this.Form.Remark
      }
      commonFunc.myConsole(conditionsParams)
      let resData = await truckapplyApi.CarApply_cancel(conditionsParams)
      if (resData.status === '000') {
        this.shipplaceFormDialogVisible = false
        this.gettruckApplylist()
        this.$message({
          type: 'success',
          message: '撤销成功!'
        })
      } else {
        this.$message({
          type: 'error',
          message: '撤销失败!'
        })
        // this.$message.error('用户名或密码错误')
      }
    },
    async getTranStationOillist() {
      let conditionsParams = {}
      let resData = await tranStationApi.getTranStation_listOil(conditionsParams)
      if (resData.status === '000') {
        this.tranStationlist = resData.data.record
        this.shiptabForm.tranStation.tranStationlist = resData.data.record
      } else {
        this.$message.error('获取失败！')
      }
    },
    async getTranStationWaterlist() {
      let conditionsParams = {}
      let resData = await tranStationApi.getTranStation_listWater(conditionsParams)
      if (resData.status === '000') {
        this.tranStationlist = resData.data.record
        this.shiptabForm.tranStation.tranStationlist = resData.data.record
      } else {
        this.$message.error('获取失败！')
      }
    },
    getDepartinform(value) { // DepartmentLev 等信息组装
      let arr = this.tranStationlist.filter(function(obj) {
        return obj.DepartmentId === value
      })
      if (commonFunc.isDefine(arr)) {
        this.Form.DepartmentLev = arr[0].DepartmentLev
        this.Form.DepartmentName = arr[0].DepartmentName
      } else {
        this.Form.DepartmentLev = ''
        this.Form.DepartmentName = ''
      }
    },
    getDepardispatch(value) { // DepartmentLev 等信息组装
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
    Invalid1change(value) {
      if (value === '1') {
        if (this.shiptabForm.carType.CarType === '2') {
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
    async getshipWaterplaces() {
      let conditionsParams = {
        // 'PageNo': this.pagination.currentPage,
        // 'PageSize': this.pagination.pagesize
      }
      let resData = await shipplaceApi.getWatershipplacelist(conditionsParams)
      if (resData.status === '000') {
        // this.shipplacelist = resData.data.record
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
        // this.shipplacelist = resData.data.record
        this.shiptabForm.shipplace.shipplacelist = resData.data.record
        this.ShipplaceOillist = resData.data.record
        if (this.shiptabForm.carType.CarType === '1') {
          this.shiptabForm.shipplace.shipplacelist = this.ShipplaceOillist
        }
      } else {
        this.$message.error('获取失败！')
      }
    },
    addruck(index) {
      // this.activeName = index
      this.CarType = index
      this.gettruckApplylist()
      this.updateRow('', [])
    },
    updateRow(index, resMembersDataArr, iscancel) {
      this.iscancel = iscancel === 1
      commonFunc.myConsole(resMembersDataArr[index])
      if (this.CarType === '1') {
        this.getTranStationOillist()
        this.getshipOilplaces()
      } else {
        this.getTranStationWaterlist()
        this.getshipWaterplaces()
      }
      this.shipplaceFormDialogVisible = true
      if (index === '') {
        this.Form.ID = 0
        this.Form.DepartmentId = ''
        this.Form.DepartmentLev = ''
        this.Form.DepartmentName = ''
        this.Form.CarType = ''
        this.Form.Date = new Date()
        this.Form.ArriveTime = ''
        this.Form.Num = 1
        this.Form.Description = ''
        this.Form.AmountNum = ''
        this.Form.IsBackUp = '0'
        this.Form.Remark = ''
        this.Form.Status = 0
      } else {
        this.Form.ID = resMembersDataArr[index].ID
        this.Form.DepartmentId = resMembersDataArr[index].DepartmentId
        this.Form.DepartmentLev = resMembersDataArr[index].DepartmentLev
        this.Form.DepartmentName = resMembersDataArr[index].DepartmentName
        this.Form.CarType = resMembersDataArr[index].CarType
        this.Form.Date = resMembersDataArr[index].Date
        this.Form.ArriveTime = resMembersDataArr[index].ArriveTime ? (resMembersDataArr[index].Date.substr(0, 10) + ' ' + resMembersDataArr[index].ArriveTime) : ''
        this.Form.Num = resMembersDataArr[index].Num
        this.Form.Description = resMembersDataArr[index].Description
        this.Form.AmountNum = resMembersDataArr[index].AmountNum + ''
        this.Form.IsBackUp = resMembersDataArr[index].IsBackUp + ''
        this.Form.Remark = resMembersDataArr[index].Remark
        this.Form.Status = resMembersDataArr[index].Status
      }
    },
    async editinfo(Status) {
      if (!this.Form.DepartmentId) {
        this.$message.warning('请选择用车机构')
        return
      }
      if (!this.Form.AmountNum) {
        this.$message.warning('请选择车型')
        return
      }
      if (!this.Form.ArriveTime && this.Form.IsBackUp === '0') {
        this.$message.warning('请选择到站时间')
        return
      }
      let conditionsParams = {
        'ID': this.Form.ID,
        'Status': Status,
        'IsBackUp': parseInt(this.Form.IsBackUp),
        'Remark': this.Form.Remark,
        'Date': commonFunc.dateFormat(this.Form.Date, 1),
        'ArriveTime': commonFunc.dateFormat(this.Form.ArriveTime, 0),
        'AmountNum': parseInt(this.Form.AmountNum) || 0,
        'Description': this.Form.Description,
        'Num': this.Form.Num,
        'CarType': this.CarType,
        'DepartmentId': this.Form.DepartmentId,
        'DepartmentLev': this.Form.DepartmentLev,
        'DepartmentName': this.Form.DepartmentName
      }
      commonFunc.myConsole(conditionsParams)
      let resData = await truckapplyApi.CarApply_edit(conditionsParams)
      if (resData.status === '000') {
        this.shipplaceFormDialogVisible = false
        this.gettruckApplylist()
        this.$message({
          type: 'success',
          message: '操作成功!'
        })
      } else {
        this.$message.error('操作失败！')
      }
    },

    async getTags_dep() {
      let conditionsParams = {}
      let resData = await tagsApi.getTags_dep(conditionsParams)
      if (resData.status === '000') {
        this.Tagslist = this.TagslistArr(resData.data.record)
      } else {
        this.$message.error('获取失败！')
      }
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
    },
    async departmentwelArr(children, key) {
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
    datepickerValuechange() {
      if (!commonFunc.isDefine(this.datepickervalue)) {
        this.datepickervalue = [0, 0]
      }
      // this.gettruckApplylist()
      this.assemblelinks()
    },
    assemblelinks() {
      this.reportfile = this.filepdf + 'ImportExcel.aspx?action=apply&CarType=' + this.shiptabForm.carType.CarType + '&QueryStatus=' + this.QueryStatus + '&StartTime=' + this.datepickervalue[0] + '&EndTime=' + this.datepickervalue[1] + '&DepartmentLev=' + this.search.DepartmentLev
    },
    handleSizeChange(val) {
      this.pagination.pagesize = val
      this.pagination.currentPage = 1
      this.gettruckApplylist()
    },
    handleCurrentChange(val) {
      this.pagination.currentPage = val
      this.gettruckApplylist()
    },

    dispatchtruck(index, resMembersDataArr) {
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
          'Date': resMembersDataArr[index].Date,
          'LeaveDate': new Date(),
          'ArrivalTime': resMembersDataArr[index].ArriveTime ? (resMembersDataArr[index].Date.substr(0, 10) + ' ' + resMembersDataArr[index].ArriveTime) : '',
          'LeaveTime': '',
          'TargetTime': '',
          'TargetDate': new Date(),
          'shipMinuteStr': '', // !!!!!!!!!!!!!!
          'ShipMinute': ''
        },
        tranStation: {
          'tranStationlist': this.shiptabForm.tranStation.tranStationlist, // !!!!!!!!!!!!!!
          'DepartmentId': resMembersDataArr[index].DepartmentId,
          'DepartmentLev': resMembersDataArr[index].DepartmentLev,
          'DepartmentName': resMembersDataArr[index].DepartmentName
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
        'CarApplyId': resMembersDataArr[index].ID
      }
    },
    viewdetailsclose() {
      this.Isdetailsview = '0'
      this.identitydisabled()
    },
    dispatchinfo(Status) {
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
        if (this.shiptabForm.carType.CarType === '1') {
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
        'ArrivalTime': commonFunc.dateFormat(this.shiptabForm.datetime.ArrivalTime, 0),
        'LeaveTime': commonFunc.dateFormat(this.shiptabForm.datetime.LeaveTime, 0),
        'TargetTime': commonFunc.dateFormat(this.shiptabForm.datetime.TargetTime, 0),
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
        'OrderNo': this.shiptabForm.OrderNo || '', // 运单号
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
      }
      if (resData.status === '000') {
        this.checkList = []
        this.shiptabFormDialogVisible = false
        this.activeName = this.shiptabForm.carType.CarType // 操作成功 列表 与此提交用车  一致
        this.gettruckApplylist()
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
// .yybcor > .el-form-item__label {
//     text-align: right;
//     float: left;
//     font-size: 14px;
//     color: #f56c6c;
//     line-height: 40px;
//     padding: 0 12px 0 0;
//     -webkit-box-sizing: border-box;
//     box-sizing: border-box;
// }
.yybinputbor>.el-input__inner {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    // border: 1px solid #f56c6c;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    // color: #606266;
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
#picDcm {
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
#Applytab {
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
.el-table td, .el-table th {
    padding: 8px 0;
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
</style>
