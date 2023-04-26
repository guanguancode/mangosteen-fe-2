import { Button } from "../../shared/Button";
import { Icon } from "../../shared/Icon";
import { defineComponent, reactive } from 'vue';
import { MainLayout } from '../../layouts/MainLayout';
import { EmojiSelect } from '../../shared/EmojiSelect';
import { Rules, validate } from'../../shared/validate';
import { TagForm } from "./TagForm";
import s from "./Tag.module.scss";
import { BackIcon } from "../../shared/BackIcon";
import { useRoute, useRouter } from "vue-router";
import { Dialog } from "vant";
import { http } from "../../shared/Http";

export const TagEdit = defineComponent({
  setup: (props, context) => {
    const route = useRoute()
    const numberId = parseInt(route.params.id!.toString())
    if (Number.isNaN(numberId)) {
      return ()=> <div>id 不存在</div>
    }
    const router = useRouter()
    const onError = ()=>{
      Dialog.alert({ title:'提示',message:'删除失败' })
    }
    const onDelete = async (options?: {withItem?: boolean})=>{
      await Dialog.confirm({
        title:'确认',
        message:'是否确定删除'
      })
      await http.delete(`/tags/${numberId}`, {
        withItems: options?.withItem ? 'true' : 'false'
      }).catch(onError)
      router.back()
    }
    return () => (
      <MainLayout>
        {{
          title: () => "编辑标签",
          icon: () => <BackIcon />,
          default: () => <>
            <TagForm id={numberId} />
            <div class={s.actions}>
                <Button level='danger' class={s.removeTags}
                 onClick={() =>onDelete()}>
                    删除标签
                </Button>
                <Button level='danger' class={s.removeTagsAndItems}
                 onClick={() =>onDelete({withItem: true})}>
                    删除标签和记账
                </Button>
            </div> 
          </>
        }}
      </MainLayout>
    );
  },
})