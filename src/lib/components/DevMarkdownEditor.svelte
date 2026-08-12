<script lang="ts">
  import CodeXml from '@lucide/svelte/icons/code-xml';
  import Save from '@lucide/svelte/icons/save';
  import X from '@lucide/svelte/icons/x';
  import type { CourseSection } from '$lib/course';

  let { section }: { section: CourseSection } = $props();
  let open = $state(false), draft = $state(''), loading = $state(false), saving = $state(false), message = $state('');

  async function toggle() {
    open = !open; message = '';
    if (!open) return;
    loading = true;
    try {
      const response = await fetch(`/__dev/course-content?file=${encodeURIComponent(section.file)}`);
      if (!response.ok) throw new Error(await response.text());
      draft = await response.text();
    } catch (error) { message = error instanceof Error ? error.message : 'Could not load Markdown'; }
    finally { loading = false; }
  }

  async function save() {
    saving = true; message = '';
    try {
      const response = await fetch('/__dev/course-content', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ file: section.file, content: draft }) });
      if (!response.ok) throw new Error(await response.text());
      message = 'Saved. Reloading the rendered lesson…';
      setTimeout(() => location.reload(), 350);
    } catch (error) { message = error instanceof Error ? error.message : 'Could not save Markdown'; saving = false; }
  }
</script>

<section class="dev-editor mt-10">
  <button class="btn btn-sm btn-outline gap-2" onclick={toggle}>
    <CodeXml size={16}/> Edit this subsection
  </button>

  {#if open}
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 sm:p-6">
      <div class="relative flex h-[85vh] w-full max-w-5xl flex-col rounded-2xl border border-warning/30 bg-base-100 p-6 shadow-2xl">
        <!-- Modal Header -->
        <div class="mb-4 flex items-center justify-between border-b border-base-200 pb-3">
          <div>
            <div class="flex items-center gap-2">
              <span class="badge badge-warning badge-sm font-bold uppercase">Development Only</span>
              <h3 class="text-base font-bold text-base-content">Edit Subsection Markdown</h3>
            </div>
            <code class="mt-1 block text-xs opacity-60 font-mono">{section.file}</code>
          </div>
          <button class="btn btn-ghost btn-sm btn-circle" onclick={toggle} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        <!-- Modal Body -->
        <div class="flex-1 overflow-hidden py-2">
          {#if loading}
            <div class="skeleton h-full w-full rounded-xl"></div>
          {:else}
            <textarea
              class="textarea h-full w-full resize-none border border-base-300 bg-base-200/40 p-4 font-mono text-sm leading-6 text-base-content focus:border-warning focus:outline-none rounded-xl"
              bind:value={draft}
              spellcheck="false"
              aria-label="Markdown source"
              placeholder="Type Markdown content here..."
            ></textarea>
          {/if}
        </div>

        <!-- Modal Footer with Save Button in Bottom Right Corner -->
        <div class="mt-4 flex items-center justify-between border-t border-base-200 pt-3">
          <div class="text-xs font-medium">
            {#if message}
              <span class={message.startsWith('Saved') ? 'text-success font-semibold' : 'text-error font-semibold'}>
                {message}
              </span>
            {/if}
          </div>
          <div class="flex items-center gap-3">
            <button class="btn btn-ghost btn-sm" onclick={toggle} disabled={saving}>
              Cancel
            </button>
            <button class="btn btn-warning btn-sm font-semibold gap-2" onclick={save} disabled={saving || loading}>
              <Save size={15}/>
              {saving ? 'Saving…' : 'Save Markdown'}
            </button>
          </div>
        </div>
      </div>
    </div>
  {/if}
</section>

