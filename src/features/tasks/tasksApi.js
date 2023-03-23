import { apiSlice } from "../api/apiSlice";

export const tasksApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => ({
        url: '/tasks',
      }),
    }),
    getTask: builder.query({
      query: (id) => ({
        url: `/tasks/${id}`,
      }),
    }),
    addTask: builder.mutation({
      query: (data) => ({
        url: '/tasks',
        method: 'POST',
        body: data,
      }),
      // pessimistic update
      async onQueryStarted({ data }, { dispatch, queryFulfilled }) {
        try {
          const taskData = await queryFulfilled;
          if (Object.keys(taskData.data).length > 1) {
            dispatch(apiSlice.util.updateQueryData('getTasks', undefined, (draft) => {
              // console.log(draft);
              draft.push(taskData.data);
            }))
          }
        } catch (err) {

        }
      }
    }),
    editTask: builder.mutation({
      query: ({ id, data }) => ({
        url: `/tasks/${id}`,
        method: 'PATCH',
        body: data,
      })
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: 'DELETE',
      }),
      // optimistic update
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(apiSlice.util.updateQueryData('getTasks', undefined, (draft) => {
          draft.filter((data) => data.id != id);
        }))
        try {
          const tasks = await queryFulfilled;
        } catch (err) {
          patchResult.undo();
        }
      }
    }),
  }),
});

export const { useGetTasksQuery, useGetTaskQuery, useAddTaskMutation, useEditTaskMutation, useDeleteTaskMutation } = tasksApi;