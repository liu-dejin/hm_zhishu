<template>
  <div class="card-container">
    <!-- 搜索区域 -->
    <div class="search-container">
      <span class="search-label">车牌号码：</span>
      <el-input v-model.trim="params.carNumber" clearable placeholder="请输入内容" class="search-main" @clear="getCarList" />
      <span class="search-label">车主姓名：</span>
      <el-input v-model.trim="params.personName" clearable placeholder="请输入内容" class="search-main" @clear="getCarList" />
      <span class="search-label">状态：</span>
      <el-select v-model="params.cardStatus" placeholder="请选择">
        <el-option v-for="item in cardStatusList" :key="item.id" :label="item.label" :value="item.value" />
      </el-select>
      <el-button type="primary" class="search-btn" @click="handleSearch">查询</el-button>
    </div>
    <!-- 新增删除操作区域 -->
    <div class="create-container">
      <el-button type="primary">添加月卡</el-button>
      <el-button>批量删除</el-button>
    </div>
    <!-- 表格区域 -->
    <div class="table">
      <el-table style="width: 100%" :data="carList">
        <el-table-column type="index" :index="indexMethod" label="序号" />
        <el-table-column prop="personName" label="车主名称" />
        <el-table-column prop="phoneNumber" label="联系方式" />
        <el-table-column prop="carNumber" label="车牌号码" />
        <el-table-column prop="carBrand" label="车辆品牌" />
        <el-table-column prop="totalEffectiveDate" label="剩余有效天数" />
        <el-table-column prop="cardStatus" label="状态" :formatter="formatCardStatus">
          <!-- 方案三 <template #default="scope">
            <el-tag :type="scope.row.cardStatus === 1 ? 'success' : 'danger'">
              {{ scope.row.cardStatus === 1 ? '正常' : '已过期' }}
            </el-tag>
          </template> -->
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="180">
          <template #default="scope">
            <el-button size="mini" type="text">续费</el-button>
            <el-button size="mini" type="text">查看</el-button>
            <el-button size="mini" type="text">编辑</el-button>
            <el-button size="mini" type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page-container">
      <el-pagination
        :current-page="params.page"
        :page-sizes="[2,4,6,8]"
        :page-size="params.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <!-- 添加楼宇 -->
    <el-dialog
      title="添加楼宇"
      width="580px"
    >
      <!-- 表单接口 -->
      <div class="form-container">
        <!-- <el-form ref="addForm" :model="addForm" :rules="addFormRules">
          <el-form-item label="楼宇名称" prop="name">
            <el-input v-model="addForm.name" />
          </el-form-item>
          <el-form-item label="楼宇层数" prop="floors">
            <el-input v-model="addForm.floors" />
          </el-form-item>
          <el-form-item label="在管面积" prop="area">
            <el-input v-model="addForm.area" />
          </el-form-item>
          <el-form-item label="物业费" prop="propertyFeePrice">
            <el-input v-model="addForm.propertyFeePrice" />
          </el-form-item>
        </el-form> -->
      </div>
      <template #footer>
        <el-button size="mini">取 消</el-button>
        <el-button size="mini" type="primary">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { getCarListApi } from '@/api/card'
export default {
  data() {
    return {
      params: {
        page: 1,
        pageSize: 2,
        carNumber: '',
        personName: '',
        cardStatus: null
      },
      carList: [],
      total: 0,
      cardStatusList: [
        {
          label: '全部',
          value: null
        },
        {
          label: '可用',
          value: 0
        },
        {
          label: '已过期',
          value: 1
        }
      ]
    }
  },
  created() {
    this.getCarList()
  },
  methods: {
    async getCarList() {
      const res = await getCarListApi(this.params)
      this.carList = res.data.rows
      this.total = res.data.total
    },
    formatCardStatus(row, column, cellValue, index) {
      // 方案一 return cellValue === 1 ? '正常' : '已过期'
      // 方案二 return row.cardStatus === 1 ? '正常' : '已过期'
      const Map = {
        0: '可用',
        1: '已过期'
      }
      return Map[cellValue]
    },
    handleSizeChange(val) {
      this.params.pageSize = val
      this.getCarList()
    },
    handleCurrentChange(val) {
      this.params.page = val
      this.getCarList()
    },
    indexMethod(index) {
      // 当前页-1 * 页容量 +  index+1
      return (this.params.page - 1) * this.params.pageSize + index + 1
    },
    handleSearch() {
      this.params.page = 1
      this.getCarList()
    }
  }
}
</script>

<style lang="scss" scoped>
.card-container {
  padding: 20px;
  background-color: #fff;
}

.search-container {
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(237, 237, 237, .9);
  padding-bottom: 20px;
  .search-main {
    width: 220px;
    margin-right: 10px;
  }
  .search-btn{
    margin-left:20px;
  }
}
.create-container{
  margin: 10px 0px;
}
.page-container{
  padding:4px 0px;
  text-align: right;
}
.form-container{
  padding:0px 80px;
}
</style>
